import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checklist from './checklist';
import Button from '../../components/ui/Button';
import backIcon from '../../assets/icons/chevron-left.svg';
import { submitSurvey, createPartyPackage } from '../../apis/surveyApi';
const TOTAL_STEPS = 7;

// ✨ 영어 카테고리를 한글로 변환하기 위한 역매핑 객체 수정
const categoryReverseMap = {
  // 식품
  CAKE: '케이크',
  COOKIE: '쿠키',
  DRINK: '음료',
  BAKERY: '베이커리',
  RICE_CAKE: '떡',
  TRADITIONAL_SNACK: '전통간식', // UI와 일치하도록 수정
  CHOCOLATE: '초콜릿',
  CANDY: '사탕',
  HEALTHY_FOOD: '건강식품',
  PRESENT_SET: '선물세트',
  // 소품
  BALLOON: '풍선',
  GARLAND: '가랜드',
  BANNER: '현수막', // UI와 일치하도록 수정
  TABLE_DECOR: '테이블장식',
  TABLEWARE: '테이블웨어', // UI와 일치하도록 수정
  FLOWER_PLANT: '꽃/화분', // UI와 일치하도록 수정
  CANDLE: '캔들', // UI와 일치하도록 수정
  // 주얼리
  RING: '반지',
  BRACELET: '팔찌',
  EARRINGS: '귀걸이',
  NECKLACE: '목걸이',
  ANKLET: '발찌',
  // 문구
  CARD_LETTER: '카드/편지지', // 포괄적 표현 유지
  GIFT_WRAP: '포장', // UI와 일치하도록 수정
  PHONE_CASE: '휴대폰 케이스', // UI와 일치하도록 수정
  GRIPTOK: '그립톡',
  STICKER: '스티커',
};

/**
 * API 응답 데이터를 UI 컴포넌트(PackageCard)가 사용하기 좋은 형태로 변환하는 함수
 * @param {Array} customPackages - API의 response.data.result.customPackage 배열
 * @returns {Array} UI에 바로 바인딩할 수 있는 패키지 객체 배열
 */
const mapApiDataToPackages = (customPackages) => {
  if (!customPackages || customPackages.length === 0) {
    return [];
  }

  return customPackages.map((pkg, index) => {
    // PackageCard의 `data.items` 형식에 맞게 상품 목록을 변환
    const formattedItems = pkg.products.map((p) => ({
      id: String(p.productId),
      // ✨ 2. `label`에 역매핑된 한글 카테고리 이름 사용
      label: categoryReverseMap[p.category] || p.category,
      name: p.productName,
      price: p.price,
      img: p.productImage,
    }));

    // ✨ 3. `compose` 텍스트도 한글 카테고리 이름으로 생성
    const koreanCategories = [...new Set(pkg.products.map((p) => categoryReverseMap[p.category] || p.category))];
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
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [budget, setBudget] = useState('');
  const [who, setWho] = useState('');
  const [items, setItems] = useState([]);
  const [specialMode, setSpecialMode] = useState('없음');
  const [specialText, setSpecialText] = useState('');
  const [packages, setPackages] = useState([]);
  const [selectedPkgId, setSelectedPkgId] = useState(null);
  const [packageName, setPackageName] = useState('');

  const toggleItem = (label) =>
    setItems((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));

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
        return !!specialMode;
      case 5:
        return selectedPkgId !== null;
      case 6:
        return packageName.trim().length > 0;
      default:
        return false;
    }
  }, [step, purpose, budget, who, items, specialMode, selectedPkgId, packageName]);

  const getBarWidth = () => {
    if (step >= 5) return '100%';
    return `${[17, 33, 50, 67, 83][step] ?? 0}%`;
  };
  const getPercentText = () => (step >= 5 ? 100 : [17, 33, 50, 67, 83][step] ?? 0);

  const goBack = () => (step > 0 ? setStep((s) => s - 1) : nav(-1));

  const handleNext = async () => {
    if (!stepDone) return;

    if (step === 4) {
      try {
        const surveyData = { purpose, budget, who, items, specialMode, specialText };
        const res = await submitSurvey(surveyData);
        console.log('제출될 설문 데이터:', surveyData);
        console.log('API 응답 확인:', res);

        const customPackageData = res.data.result?.customPackage;

        if (res.data?.isSuccess && customPackageData) {
          const formattedPackages = mapApiDataToPackages(customPackageData);
          setPackages(formattedPackages);

          if (formattedPackages.length > 0) {
            setSelectedPkgId(formattedPackages[0].id);
          }
        } else {
          console.log('API 호출은 성공했으나 추천 패키지가 없습니다.');
          setPackages([]);
        }
      } catch (err) {
        console.error('파티 정보 제출 실패', err);
        setPackages([]);
        return;
      }
    }

    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      try {
        // 1. 선택된 패키지 정보 찾기
        const selectedPackage = packages.find((p) => p.id === selectedPkgId);
        if (!selectedPackage) {
          console.error('선택된 패키지를 찾을 수 없습니다.');
          return;
        }

        // 2. 선택된 패키지에서 상품 ID 목록 추출
        const productIds = selectedPackage.items.map((item) => Number(item.id));

        // 3. API로 보낼 데이터 준비
        const packageData = {
          packageName: packageName.trim(),
          productIds: productIds,
        };

        // 4. 패키지 생성 API 호출
        await createPartyPackage(packageData);

        // 5. 성공 시 다음 페이지로 이동
        nav('/party');
      } catch (err) {
        console.error('파티 생성 실패', err);
        // 사용자에게 에러 알림(예: toast)을 띄워주는 로직 추가 가능
      }
    }
  };

  const nextLabel = step === TOTAL_STEPS - 1 ? '완료' : '다음';

  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-white">
      <header className="sticky top-0 z-10 w-full bg-white">
        <div className="w-full max-w-md px-5 pt-16 pb-3 mx-auto">
          <div className="flex items-center">
            <button aria-label="뒤로가기" onClick={goBack} className="p-2 -m-2 text-gray-600">
              <img src={backIcon} alt="back icon" />
            </button>
            <div className="relative flex-1 mx-3 h-1.5 rounded-full bg-gray-200">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-[#8371FD] transition-all duration-300"
                style={{ width: getBarWidth() }}
              />
            </div>
            <div className="w-10 text-right text-[#8371FD] text-xs font-medium">{getPercentText()}%</div>
          </div>
        </div>
      </header>
      <div className="flex-1 w-full max-w-md py-6 mx-auto overflow-auto">
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
      <footer className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid w-full max-w-md grid-cols-2 gap-3 px-5 py-4 mx-auto">
          <button
            onClick={goBack}
            className="h-12 rounded-2xl bg-[#8B949E] text-white font-pretendard text-base font-semibold"
          >
            이전
          </button>
          <Button isActive={stepDone} onClick={handleNext}>
            {nextLabel}
          </Button>
        </div>
      </footer>
    </main>
  );
}
