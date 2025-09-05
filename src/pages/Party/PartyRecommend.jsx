// src/pages/Party/PartyRecommend.jsx
import { useMemo, useState } from 'react';
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
const SIMILAR_ITEMS = [
  { id: 1, title: '라브앤프로포즈 커플 우정반지 세트', price: 45000, img: prodCard },
  { id: 2, title: '플로리스트엣닷 프리미엄 생화 꽃다발', price: 32000, img: prodFlower },
  { id: 3, title: '파티메이커 홈파티 미니 키트', price: 32000, img: prodCandle },
  { id: 4, title: '로맨틱 티타임 세트', price: 15000, img: prodTea },
];

const PACKAGE_ITEMS = [
  { key: 'flower', label: '생화 꽃다발 구매하기', price: 10000, img: ideaBouquet },
  { key: 'balloon', label: '하트 풍선 세트 구매하기', price: 10000, img: ideaCandle },
  { key: 'couple', label: '커플링 구매하기', price: 10000, img: ideaCard },
  { key: 'setup', label: '프로포즈 세팅하기', price: 10000, img: ideaDiffuser },
];

const IDEA_GRID = [
  { id: 'bqt', label: '꽃다발', img: ideaBouquet },
  { id: 'neck', label: '주얼리', img: ideaCard },
  { id: 'sun', label: '꽃다발', img: ideaFlower },
  { id: 'balloon', label: '풍선', img: ideaCandle },
  { id: 'arr', label: '플라워', img: ideaDiffuser },
  { id: 'choco', label: '초콜릿', img: ideaChoco },
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
  const [selectedItems, setSelectedItems] = useState({
    pkg1: [1, 2, 3],
  });

  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
    nav(path);
  };

  const handleItemToggle = (packageId, itemId) => {
    setSelectedItems((prev) => {
      const currentSelection = prev[packageId] || [];
      const newSelection = currentSelection.includes(itemId)
        ? currentSelection.filter((id) => id !== itemId)
        : [...currentSelection, itemId];
      return { ...prev, [packageId]: newSelection };
    });
  };

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
          className=" w-full h-10 rounded-xl bg-[#7F6BFF] text-white text-[14px] font-semibold active:opacity-90 flex items-center justify-center gap-2"
        >
          <Icon name="party-nav" size={0.9375} />
          맞춤 파티 시작하기
        </button>
      </div>

      {/* 하단 추천 세트 영역 */}
      <div className="flex-1 rounded-t-[1.125rem] bg-[linear-gradient(180deg,_#D6CFFF_0%,_#FFF_18%)] text-black p-4 pt-[1.87rem] space-y-4 -mt-5 relative">
        <h2 className="text-[1.125rem] font-pretendard  font-semibold text-[#191A1C]">목적별로 골라보는 추천 세트</h2>

        <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-hide ">
          {PACKAGES.map((pkg) => (
            // 각 카드의 너비를 지정하고 줄어들지 않도록 설정
            <div key={pkg.id} className="w-[85vw] max-w-[340px] flex-shrink-0">
              <PackageCard
                variant="interactive"
                data={pkg}
                selectedItems={selectedItems[pkg.id] || []}
                onItemToggle={(itemId) => handleItemToggle(pkg.id, itemId)}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
