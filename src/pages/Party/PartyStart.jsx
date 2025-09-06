// src/pages/Party/PartyStart.jsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checklist from './checklist';
import Button from '../../components/ui/Button';
import backIcon from '../../assets/icons/chevron-left.svg';
import { submitSurvey, createPartyPackage } from '../../apis/surveyApi';

const TOTAL_STEPS = 7; // 0~6

// ✨ 영어 카테고리 → 한글 라벨 매핑
const categoryReverseMap = {
  // 식품
  CAKE: '케이크',
  COOKIE: '쿠키',
  DRINK: '음료',
  BAKERY: '베이커리',
  RICE_CAKE: '떡',
  TRADITIONAL_SNACK: '전통간식',
  CHOCOLATE: '초콜릿',
  CANDY: '사탕',
  HEALTHY_FOOD: '건강식품',
  PRESENT_SET: '선물세트',
  // 소품
  BALLOON: '풍선',
  GARLAND: '가랜드',
  BANNER: '현수막',
  TABLE_DECOR: '테이블장식',
  TABLEWARE: '테이블웨어',
  FLOWER_PLANT: '꽃/화분',
  CANDLE: '캔들',
  // 주얼리
  RING: '반지',
  BRACELET: '팔찌',
  EARRINGS: '귀걸이',
  NECKLACE: '목걸이',
  ANKLET: '발찌',
  // 문구
  CARD_LETTER: '카드/편지지',
  GIFT_WRAP: '포장',
  PHONE_CASE: '휴대폰 케이스',
  GRIPTOK: '그립톡',
  STICKER: '스티커',
};

// API 응답 → PackageCard용 데이터로 매핑
const mapApiDataToPackages = (customPackages) => {
  if (!customPackages || customPackages.length === 0) return [];

  return customPackages.map((pkg, index) => {
    const formattedItems = (pkg.products || []).map((p) => ({
      id: String(p.productId),
      label: categoryReverseMap[p.category] || p.category,
      name: p.productName,
      price: p.price,
      img: p.productImage,
    }));

    const koreanCategories = [
      ...new Set((pkg.products || []).map((p) => categoryReverseMap[p.category] || p.category)),
    ];
    const composeText = koreanCategories.slice(0, 2).join(', ');

    return {
      id: index,
      title: `${pkg.budget}만원대 맞춤 패키지`,
      emoji: '🎁',
      compose: composeText,
      items: formattedItems,
    };
  });
};

export default function PartyStart() {
  const nav = useNavigate();

  // 설문 상태
  const [purpose, setPurpose] = useState('');
  const [budget, setBudget] = useState('');
  const [who, setWho] = useState('');
  const [items, setItems] = useState([]); // 선택된 항목(문자열 배열)
  const [specialMode, setSpecialMode] = useState('없음');
  const [specialText, setSpecialText] = useState('');

  // 추천 패키지/선택/이름
  const [packages, setPackages] = useState([]);
  const [selectedPkgId, setSelectedPkgId] = useState(null);
  const [packageName, setPackageName] = useState('');

  // 단계
  const [step, setStep] = useState(0);

  const toggleItem = (label) =>
    setItems((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));

  /* 완료 기준 */
  const stepDone = useMemo(() => {
    switch (step) {
      case 0:
        return !!purpose;
      case 1:
        return !!budget;
      case 2:
        return !!who;
      case 3:
        return items.length > 0;
      case 4:
        return !!specialMode; // "없음"도 선택으로 인정
      case 5:
        return selectedPkgId !== null;
      case 6:
        return packageName.trim().length > 0;
      default:
        return false;
    }
  }, [step, purpose, budget, who, items, specialMode, selectedPkgId, packageName]);

  /* 진행바: 0%부터 시작 (고정 rem 폭) */
  const getBarWidth = () => {
    switch (step) {
      case 0:
        return '0rem'; // 0%
      case 1:
        return '2.8125rem'; // 17%
      case 2:
        return '5.4375rem'; // 33%
      case 3:
        return '8.1875rem'; // 50%
      case 4:
        return '11.5rem'; // 67%
      case 5:
      case 6:
        return '16.00575rem'; // 100% (5부터 꽉참)
      default:
        return '0rem';
    }
  };
  const getPercentText = () => (step >= 5 ? 100 : [0, 17, 33, 50, 67, 83][step] ?? 0);

  const goBack = () => (step > 0 ? setStep((s) => s - 1) : nav(-1));

  const handleNext = async () => {
    if (!stepDone) return;

    // step 4에서 설문 제출 → 맞춤 패키지 요청
    if (step === 4) {
      try {
        const surveyData = { purpose, budget, who, items, specialMode, specialText };
        const res = await submitSurvey(surveyData);

        const customPackageData = res?.data?.result?.customPackage;
        if (res?.data?.isSuccess && customPackageData) {
          const formatted = mapApiDataToPackages(customPackageData);
          setPackages(formatted);
          if (formatted.length > 0) setSelectedPkgId(formatted[0].id);
        } else {
          setPackages([]);
          setSelectedPkgId(null);
        }
      } catch (err) {
        console.error('파티 정보 제출 실패', err);
        setPackages([]);
        setSelectedPkgId(null);
        // 설문 실패 시 그대로 다음 단계로 진행할지 여부는 정책에 맞게
        // return; // 막을 거면 주석 해제
      }
    }

    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      // 마지막 단계(6): 패키지 생성
      try {
        const selectedPackage = packages.find((p) => p.id === selectedPkgId);
        if (!selectedPackage) {
          console.error('선택된 패키지를 찾을 수 없습니다.');
          return;
        }

        const productIds = selectedPackage.items.map((it) => Number(it.id));
        const payload = { packageName: packageName.trim(), productIds };

        await createPartyPackage(payload);
        nav('/party');
      } catch (err) {
        console.error('파티 생성 실패', err);
      }
    }
  };

  const handleDone = () => {
    if (!stepDone) return;
    // 단일 버튼 케이스에서 완료를 눌렀을 때의 처리(필요 시 분기)
    nav('/party');
  };

  const nextLabel = step === TOTAL_STEPS - 1 ? '완료' : '다음';

  return (
    <main className="flex flex-col w-full min-h-screen bg-white">
      {/* Header (sticky) - 첫 번째 UI 구조 그대로 */}
      <header className="sticky top-0 z-10 w-full bg-white">
        <div className="mx-auto w-[22.5rem] px-5 pt-16 pb-3">
          <div className="flex items-center">
            {/* 뒤로가기 */}
            <button aria-label="뒤로가기" onClick={goBack} className="p-2 -m-2">
              <img src={backIcon} alt="뒤로가기" className="w-[0.9375rem] h-[0.9375rem]" />
            </button>

            {/* 프로그레스바 */}
            <div className="relative flex-1 mx-3 h-[0.3125rem] rounded-[1.125rem] bg-[#DEE4E9]">
              <div
                className="absolute left-0 top-0 h-[0.3125rem] rounded-[0.5rem] bg-[#8371FD] transition-all duration-300"
                style={{ width: getBarWidth() }}
              />
            </div>

            {/* 퍼센트 */}
            <div className="w-[1.9375rem] text-right text-[#8371FD] font-pretendard text-[0.75rem] font-medium leading-[1.2rem]">
              {getPercentText()}%
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto w-[22.5rem] flex-1 overflow-auto py-6">
        <Checklist
          step={step}
          purpose={purpose}
          setPurpose={setPurpose}
          budget={budget}
          setBudget={setBudget}
          who={who}
          setWho={setWho}
          items={items}
          toggleItem={toggleItem}
          specialMode={specialMode}
          setSpecialMode={setSpecialMode}
          specialText={specialText}
          setSpecialText={setSpecialText}
          selectedPkgId={selectedPkgId}
          setSelectedPkgId={setSelectedPkgId}
          packageName={packageName}
          setPackageName={setPackageName}
          packages={packages}
        />
      </div>
      {/* Footer (sticky) - 버튼들 */}
      <footer className="sticky bottom-0 z-10 w-full bg-white border-f border-black/5">
        <div className="mx-auto w-[22.5rem] px-5 py-3">
          {/* step 0 / 6 : wide 단일 버튼 */}
          {step === 0 || step === 6 ? (
            <button
              type="button"
              onClick={step === 6 ? handleDone : handleNext}
              disabled={!stepDone}
              className={[
                'w-full py-[0.6875rem] px-0 rounded-lg',
                'font-pretendard text-[1rem] font-semibold leading-[1.4rem]',
                stepDone ? 'bg-[#8371FD] text-white hover:bg-[#6f60f0]' : 'bg-[#81878B] text-white cursor-not-allowed',
              ].join(' ')}
            >
              {step === 6 ? '완료' : '다음'}
            </button>
          ) : (
            // step 1 ~ 5 : 이전 / 다음
            <div className="flex gap-2">
              <button
                type="button"
                onClick={goBack}
                className="flex-1 py-3 rounded-lg bg-[#81878B] text-white
                     font-pretendard text-[1rem] font-semibold leading-[1.4rem] transition-colors"
              >
                이전
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!stepDone}
                className={[
                  'flex-1 py-3 rounded-lg font-pretendard text-[1rem] font-semibold leading-[1.4rem] transition-colors',
                  stepDone
                    ? 'bg-[#8371FD] text-white hover:bg-[#6f60f0]'
                    : 'bg-[#81878B] text-white cursor-not-allowed',
                ].join(' ')}
              >
                다음
              </button>
            </div>
          )}
        </div>
      </footer>
    </main>
  );
}
