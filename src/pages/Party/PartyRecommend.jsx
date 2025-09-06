// src/pages/Party/PartyRecommend.jsx
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/ui/Icon';
import imgEarring from '../../assets/images/card.svg';
// 🔹 이미지 에셋
import badgeGift from '../../assets/images/bear.svg'; // 진행 카드 아이콘으로 다시 사용
import bannerImg from '../../assets/images/special_banner.svg';

import ideaBouquet from '../../assets/images/bouquet.svg';
import ideaCandle from '../../assets/images/candle.svg';
import ideaFlower from '../../assets/images/flower.svg';
import ideaDiffuser from '../../assets/images/diffuser.svg';
import ideaCard from '../../assets/images/card.svg';
import ideaChoco from '../../assets/images/choco.svg';

import prodFlower from '../../assets/images/flower.svg';
import prodCard from '../../assets/images/card.svg';
import prodCandle from '../../assets/images/candle.svg';
import prodTea from '../../assets/images/tea.svg';

import PartyBg from '../../assets/images/partybg.svg'; // 헤더 배경 이미지
import PackageCard from '../../components/domain/PackageCard';
import PartyCardClose from '../../components/domain/PartyCardClose';
import MyPartyBg from '../../assets/images/for-my-party-bg.svg';
import Coupon from '../../assets/images/coupon.svg';

import ConfirmModal from '../../components/ui/ConfirmModal';
import BottomSheet from '../../components/ui/BottomSheet';
import PartyAddSheet from '../../components/domain/PartyAddSheet';
import PartySelectSheet from '../../components/domain/PartySelectSheet';
import { getMyParties } from '../../apis/partyApi';

// 파티 정보
const userParties = [
  { id: 'p1', name: '프로포즈' },
  { id: 'p2', name: '기본 폴더' },
];

const PACKAGES = [
  {
    id: 'pkg1',
    title: '어버이날 패키지',
    emoji: '🥰',
    compose: '꽃다발, 케이크, 감사카드',
    items: [
      { id: 1, label: '카네이션', name: '마음을 전하는 생화', price: 21000, img: imgEarring },
      { id: 2, label: '레터링 케이크', name: '세상에 하나뿐인 케이크', price: 20000, img: imgEarring },
      { id: 3, label: '감사카드', name: '진심을 담은 손편지', price: 4000, img: imgEarring },
    ],
  },
  {
    id: 'pkg2',
    title: '로맨틱 프로포즈 패키지',
    emoji: '💍',
    compose: '커플링, 꽃다발, 향초',
    items: [
      { id: 1, label: '커플링', name: '라브앤프로포즈 커플 반지', price: 45000, img: imgEarring },
      { id: 2, label: '장미 꽃다발', name: '플로리스트엣닷 프리미엄', price: 32000, img: imgEarring },
      { id: 3, label: '향초', name: '파티메이커 홈파티 키트', price: 32000, img: imgEarring },
    ],
  },
  {
    id: 'pkg3',
    title: '생일 축하 패키지',
    emoji: '🎉',
    compose: '케이크, 선물, 축하카드',
    items: [
      { id: 1, label: '생일 케이크', name: '특별한 날을 위한 케이크', price: 25000, img: imgEarring },
      { id: 2, label: '향초', name: '분위기 있는 선물', price: 18000, img: imgEarring },
      { id: 3, label: '티 세트', name: '로맨틱 티타임 세트', price: 14000, img: imgEarring },
    ],
  },
];

export default function PartyRecommend() {
  const nav = useNavigate();
  // ✨ API로부터 받아온 파티 목록을 저장할 state
  const [myParties, setMyParties] = useState([]);
  const [selectedItems, setSelectedItems] = useState({ pkg2: [1, 2, 3] });
  const [modalStep, setModalStep] = useState(null);
  const [itemsToAdd, setItemsToAdd] = useState([]);
  // ✨ myParties 배열의 길이를 기반으로 파티 유무를 결정
  const hasActiveParty = myParties.length > 0;

  // ✨ 컴포넌트가 마운트될 때 파티 목록을 불러옵니다.
  useEffect(() => {
    const fetchMyParties = async () => {
      try {
        const res = await getMyParties();

        // ✨ 수정된 부분: API 응답이 객체인지 확인하고 배열로 감싸서 state에 저장
        if (res.isSuccess && res.result && typeof res.result === 'object' && !Array.isArray(res.result)) {
          // 단일 객체로 응답이 오면 배열에 담아줍니다.
          setMyParties([res.result]);
        } else if (res.isSuccess && Array.isArray(res.result)) {
          // 혹시 배열로 올 경우도 대비합니다.
          setMyParties(res.result);
        } else {
          setMyParties([]);
        }
      } catch (error) {
        console.error('내 파티 목록을 불러오는데 실패했습니다.', error);
        setMyParties([]);
      }
    };

    fetchMyParties();
  }, []);

  const handleNavigation = (path) => nav(path);

  // ▼▼▼ 수정된 부분: 핸들러 함수들 ▼▼▼
  const handleOpenAddToCartModal = (items) => {
    if (items.length === 0) {
      alert('먼저 패키지에서 아이템을 선택해주세요.');
      return;
    }
    setItemsToAdd(items); // 전달받은 아이템들을 임시 state에 저장
    setModalStep('selectAction'); // 다음 단계인 모달 열기
  };

  const handleSelectNewParty = () => {
    setModalStep('addParty');
  };

  const handleSelectExistingParty = () => {
    setModalStep('selectParty');
  };

  const handleAddParty = (partyName) => {
    console.log(`새 파티 '${partyName}' 생성하며 아이템 추가:`, itemsToAdd);
    // TODO: itemsToAdd와 partyName을 API로 보내는 로직
    setItemsToAdd([]); // 임시 상태 초기화
    setModalStep(null); // 모든 모달/시트 닫기
  };

  // 기존 파티 선택 로직: 임시 저장된 itemsToAdd를 사용합니다.
  const handleSelectParty = (partyId) => {
    console.log(`기존 파티 '${partyId}'에 아이템 추가:`, itemsToAdd);
    // TODO: itemsToAdd와 partyId를 API로 보내는 로직
    setItemsToAdd([]); // 임시 상태 초기화
    setModalStep(null); // 모든 모달/시트 닫기
  };
  // ▲▲▲ 수정된 부분 ▲▲▲

  const handleItemToggle = (packageId, itemId) => {
    setSelectedItems((prev) => {
      const currentSelection = prev[packageId] || [];
      const newSelection = currentSelection.includes(itemId)
        ? currentSelection.filter((id) => id !== itemId)
        : [...currentSelection, itemId];
      return { ...prev, [packageId]: newSelection };
    });
  };
  // ✨ PartySelectSheet에 맞는 형태로 데이터를 매핑합니다.
  const partiesForSelectSheet = myParties.map((party) => ({
    id: party.partyId,
    name: party.partyName,
  }));
  return (
    <main className={' h-full min-h-screen mx-auto font-pretendard flex flex-col  bg-[#F8F8F8]'}>
      {/* 상단 UI */}
      <div className="relative px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-4 overflow-hidden bg-[#181A1C] text-white">
        <img src={PartyBg} alt="Party Background" className="absolute inset-0 z-0 object-cover w-full h-full" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mt-2 text-[18px] font-semibold">토리님의 파티 공간이에요</h1>
              <p className="mt-1 text-[12px] text-white/70">나만의 파티를 추가해 보거나, 기존 파티를 관리해보세요.</p>
            </div>
            <Icon name="giftbox-ribbon" className="w-[8rem] h-[8rem] flex-shrink-0" />
          </div>
        </div>
      </div>
      <div className="p-4 pt-0 pb-12 bg-[#181A1C]">
        <button
          onClick={() => handleNavigation('/party/start')}
          className=" w-full h-10 rounded-xl bg-[#7F6BFF] text-white text-[0.875rem] font-pretendard font-medium active:opacity-90 flex items-center justify-center gap-2"
        >
          <Icon name="party-nav" size={0.9375} className="font-pretendard" />
          맞춤 파티 시작하기
        </button>
      </div>
      {hasActiveParty && (
        <section className="relative px-4 pt-6 pb-10 overflow-hidden -mt-5 rounded-t-[1.125rem] bg-[#E2DEFF]">
          <img
            src={MyPartyBg}
            alt="My Party Background"
            className="absolute top-0 left-0 z-0 object-cover w-full pointer-events-none"
          />
          <div className="relative z-10">
            <h2 className="text-[1.125rem] font-pretendard font-semibold text-[#191A1C] mb-3">나만의 파티 준비</h2>
            <div className="flex justify-center">
              {/* ✨ 첫 번째 파티 데이터를 PartyCardClose에 전달 */}
              <PartyCardClose
                partyId={myParties[0].partyId} // ✨ 1. partyId를 prop으로 전달
                title={myParties[0].partyName}
                progress={myParties[0].progressRate / 100} // progress는 0~1 사이 값이므로 100으로 나눔
                tasks={myParties[0].todoResponses}
              />
            </div>
          </div>
        </section>
      )}
      {/* 하단 추천 세트 영역 */}
      <div
        className={`
                    flex-1 text-black pl-4 pr-4 pb-4 pt-[1.87rem] space-y-4 -mt-5 relative
                    ${
                      hasActiveParty
                        ? 'bg-white' // 파티가 있을 때: 흰색 배경만 적용
                        : 'rounded-t-[1.125rem] bg-[linear-gradient(180deg,_#D6CFFF_0%,_#FFF_18%)]' // 파티가 없을 때: 라운드와 그라데이션 적용
                    }
                `}
      >
        {hasActiveParty && <img src={Coupon} alt="20% 할인 쿠폰" className="w-full h-auto" />}
        <h2 className="text-[1.125rem] font-pretendard  font-semibold text-[#191A1C]">목적별로 골라보는 추천 세트</h2>
        <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-hide ">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="w-[85vw] max-w-[340px] flex-shrink-0">
              <PackageCard
                variant="interactive"
                data={pkg}
                selectedItems={selectedItems[pkg.id] || []}
                onItemToggle={(itemId) => handleItemToggle(pkg.id, itemId)}
                onAddToCart={() => handleOpenAddToCartModal(selectedItems[pkg.id] || [])}
              />
            </div>
          ))}
        </div>
      </div>
      {/* ▼▼▼ 수정된 부분: 모달/바텀시트 렌더링 ▼▼▼ */}
      {/* 1. 파티 담기 선택 모달 */}
      <ConfirmModal
        open={modalStep === 'selectAction'}
        onClose={() => setModalStep(null)}
        title="내 파티 담기 선택"
        description="홈파티 패키지를 추가할 파티를 선택해주세요."
        confirmText="새 파티로 생성"
        onConfirm={handleSelectNewParty}
        cancelText="기존 파티에 추가"
        onCancel={handleSelectExistingParty}
      />
      {/* 2. 새 파티 추가 바텀시트 */}
      <BottomSheet open={modalStep === 'addParty'} onClose={() => setModalStep(null)}>
        <PartyAddSheet onAddParty={handleAddParty} />
      </BottomSheet>
      {/* 3. 기존 파티 선택 바텀시트 */}
      {/* ✨ 기존 파티 선택 바텀시트: API 데이터와 연결 */}{' '}
      <BottomSheet open={modalStep === 'selectParty'} onClose={() => setModalStep(null)}>
        {' '}
        <PartySelectSheet
          parties={partiesForSelectSheet} // 매핑된 데이터 사용
          onSelectParty={handleSelectParty}
        />{' '}
      </BottomSheet>
      {/* ▲▲▲ 수정된 부분 ▲▲▲ */}
    </main>
  );
}
