import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checklist from "./checklist";
import Button from "../../components/ui/Button";
import backIcon from "../../assets/icons/chevron-left.svg";

const TOTAL_STEPS = 7; // 0~6

export default function PartyStart() {
  const nav = useNavigate();

  const [purpose, setPurpose] = useState("");
  const [budget, setBudget] = useState("");
  const [who, setWho] = useState("");
  const [items, setItems] = useState([]);
  const [specialMode, setSpecialMode] = useState("없음");
  const [selectedPkgId, setSelectedPkgId] = useState(null);
  const [packageName, setPackageName] = useState("");

  const [step, setStep] = useState(0);

  const toggleItem = (label) =>
    setItems((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );

  /* 완료 기준 */
  const stepDone = useMemo(() => {
    switch (step) {
      case 0: return !!purpose;
      case 1: return !!budget;
      case 2: return !!who;
      case 3: return items.length > 0;
      case 4: return !!specialMode;
      case 5: return selectedPkgId !== null;
      case 6: return packageName.trim().length > 0;
      default: return false;
    }
  }, [step, purpose, budget, who, items, specialMode, selectedPkgId, packageName]);

  /* 진행바: 피그마 고정 폭 */
  const getBarWidth = () => {
    switch (step) {
      case 0: return "2.8125rem";     // 17%
      case 1: return "5.4375rem";     // 33%
      case 2: return "8.1875rem";     // 50%
      case 3: return "11.5rem";       // 67%
      case 4: return "13.5625rem";    // 83%
      case 5:
      case 6: return "16.00575rem";   // ✅ 100% (case 5부터)
      default: return "0rem";
    }
  };
  const getPercentText = () =>
    (step >= 5) ? 100 : ([17, 33, 50, 67, 83][step] ?? 0); 

  const goBack = () => (step > 0 ? setStep((s) => s - 1) : nav(-1));
  const handleNext = () => {
    if (!stepDone) return;
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else nav("/party");
  };
  const nextLabel = step === TOTAL_STEPS - 1 ? "완료" : "다음";

  return (
    <main className="min-h-screen w-full bg-white flex flex-col">
      {/* Header (sticky) */}
      <header className="w-full bg-white sticky top-0 z-10">
        {/* 360px 캔버스, 좌우 20px */}
        <div className="mx-auto w-[22.5rem] px-5 pt-16 pb-3">
          {/* 한 줄: 뒤로가기 / 프로그레스바 / 퍼센트 */}
          <div className="flex items-center">
            {/* 뒤로가기 */}
            <button
              aria-label="뒤로가기"
              onClick={goBack}
              className="p-2 -m-2"
            >
              <img
                src={backIcon}
                alt="뒤로가기"
                className="w-[0.9375rem] h-[0.9375rem] flex-shrink-0"
              />
            </button>

            {/* 프로그레스바 (중앙 확장) */}
            <div className="relative flex-1 mx-3 h-[0.3125rem] rounded-[1.125rem] bg-[#DEE4E9]">
              <div
                className="absolute left-0 top-0 h-[0.3125rem] rounded-[0.5rem] bg-[#8371FD] transition-all duration-300"
                style={{ width: getBarWidth() }}
              />
            </div>

            {/* 퍼센트 텍스트 */}
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
          selectedPkgId={selectedPkgId}
          setSelectedPkgId={setSelectedPkgId}
          packageName={packageName}
          setPackageName={setPackageName}
        />
      </div>

      {/* Footer Buttons */}
      <footer className="sticky bottom-0 left-0 right-0 bg-white">
        <div className="mx-auto w-[22.5rem] px-5 py-4 grid grid-cols-2 gap-3">
          <button
            onClick={goBack}
            className="h-12 rounded-2xl bg-[#8B949E] text-white font-pretendard text-[16px] font-semibold"
          >
            이전
          </button>

          <Button
            variant="step"
            isActive={stepDone}
            isFinal={step === TOTAL_STEPS - 1}
            onClick={handleNext}
            className="h-12 rounded-2xl"
          >
            {nextLabel}
          </Button>
        </div>
      </footer>
    </main>
  );
}