import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checklist from './checklist';
import Button from '../../components/ui/Button';
import backIcon from '../../assets/icons/chevron-left.svg';
import { submitSurvey } from '../../apis/surveyApi';
const TOTAL_STEPS = 7;

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
        console.log('API 응답 확인:', res);
        if (res?.packages) {
          setPackages(res.packages);
        }
      } catch (err) {
        console.error('파티 정보 제출 실패', err);
        return;
      }
    }
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      nav('/party');
    }
  };

  const nextLabel = step === TOTAL_STEPS - 1 ? '완료' : '다음';

  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-white">
      <header className="sticky top-0 z-10 w-full bg-white">
        <div className="w-full max-w-md px-5 pt-16 pb-3 mx-auto">
          <div className="flex items-center">
            <button aria-label="뒤로가기" onClick={goBack} className="p-2 -m-2 text-gray-600">
              <img src={backIcon} />
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
