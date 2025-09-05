// src/pages/Party/PartyRecommend.jsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/ui/Icon';

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

export default function PartyRecommend() {
  const nav = useNavigate();
  const [selected, setSelected] = useState([]);

  const sum = useMemo(
    () =>
      selected.reduce((acc, key) => {
        const found = PACKAGE_ITEMS.find((x) => x.key === key);
        return acc + (found ? found.price : 0);
      }, 0),
    [selected]
  );

  const toggle = (key) => setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  return (
    <main
      className={['w-[22.5rem] h-[46.25rem] mx-auto', 'bg-[#181A1C] text-white font-pretendard', 'flex flex-col'].join(
        ' '
      )}
    >
      <div className="relative px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-4 overflow-hidden">
        <img src={PartyBg} alt="Party Background" className="absolute inset-0 z-0 object-cover w-full h-full" />
        <div className="relative z-10">
          {/* 1. 텍스트와 아이콘을 감싸는 Flexbox 컨테이너 */}
          <div className="flex items-center justify-between">
            {/* 텍스트 그룹 (자동으로 왼쪽 정렬됨) */}
            <div>
              <h1 className="mt-2 text-[18px] font-semibold">토리님의 파티 공간이에요</h1>
              <p className="mt-1 text-[12px] text-white/70">나만의 파티를 추가해 보거나, 기존 파티를 관리해보세요.</p>
            </div>

            {/* 아이콘 (자동으로 오른쪽 정렬됨) */}
            <Icon name="giftbox-ribbon" className="w-[12.625rem] h-[8.375rem]" />
          </div>

          {/* 2. 버튼 */}
        </div>
      </div>
      <div className="p-4 pt-0">
        <button
          onClick={() => nav('/party/start')}
          className=" w-full h-10 rounded-xl bg-[#7F6BFF] text-white text-[14px] font-semibold active:opacity-90 flex items-center justify-center gap-2"
        >
          <Icon name="party-nav" s ize={0.9375} />
          맞춤 파티 시작하기
        </button>
      </div>
    </main>
  );
}
