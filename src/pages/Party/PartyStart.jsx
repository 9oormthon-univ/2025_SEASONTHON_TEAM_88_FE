// src/pages/Party/StartPartyPurpose.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Checklist from "./checklist";
import backIcon from "../../assets/icons/chevron-left.svg";
import closeIcon from "../../assets/icons/cross.svg";

const TOTAL_STEPS = 6;

export default function StartPartyPurpose() {
  const nav = useNavigate();

  const [purpose, setPurpose] = useState("");
  const [budget, setBudget] = useState("");
  const [who, setWho] = useState("");
  const [items, setItems] = useState([]);
  const [specialMode, setSpecialMode] = useState("");
  const [specialText, setSpecialText] = useState("");
  const [step, setStep] = useState(0);

  const stepDone = useMemo(() => {
    switch (step) {
      case 0: return !!purpose;
      case 1: return !!budget;
      case 2: return !!who;
      case 3: return items.length > 0;
      case 4: return specialMode === "없음" || (specialMode === "직접입력" && specialText.trim().length > 0);
      case 5: return true; // 완료 화면
      default: return false;
    }
  }, [step, purpose, budget, who, items, specialMode, specialText]);

  const percent = useMemo(() => {
    const finished = Math.min(step, TOTAL_STEPS - 1);
    const completedSteps = finished + (stepDone ? 1 : 0);
    return Math.round((completedSteps / TOTAL_STEPS) * 100);
  }, [step, stepDone]);

  const goBack = () => (step > 0 ? setStep((s) => s - 1) : nav(-1));
  const goClose = () => nav(-1);

  const handleNext = () => {
    if (!stepDone) return;
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else nav("/party");
  };

  const toggleItem = (label) => {
    setItems((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

const Header = () => (
  <header className="px-5 mb-2">
    <div
      className="
        inline-flex
        px-[0.75rem] pt-[0.4375rem] pr-[1rem] pb-[0.5625rem]
        flex-col justify-center items-end gap-[0.75rem]
        bg-white
        w-full
      "
    >
      <div className="flex items-center justify-between w-full">
        {/* 뒤로가기 버튼 */}
        <button aria-label="뒤로가기" onClick={goBack} className="p-2 -m-2">
          <img src={backIcon} alt="뒤로가기" className="w-6 h-6" />
        </button>

        <h1 className="text-[17px] font-semibold">내 파티 시작하기</h1>

        {/* 닫기 버튼 */}
        <button aria-label="닫기" onClick={goClose} className="p-2 -m-2">
          <img src={closeIcon} alt="닫기" className="w-6 h-6" />
        </button>
      </div>

      {/* 진행 바 */}
<div className="mt-3">
  <div className="flex items-center w-[17.9375rem] h-[0.3125rem] pr-[15.125rem] rounded-[1.125rem] bg-[#DEE4E9]">
    <div
      className="h-full bg-[#8371FD] rounded-[1.125rem] transition-all duration-300"
      style={{ width: `${percent}%` }}
    />
  </div>
  <div className="mt-1 text-[12px] text-gray-500 text-right">{percent}%</div>
</div>
    </div>
  </header>
);

  return (
    <main
      className="
        w-[22.5rem] h-[46.25rem] mx-auto bg-[#FAFAFB]
        flex flex-col font-pretendard relative
      "
    >
      <Header />

      {/* 본문: 플로팅 버튼에 가리지 않게 padding-bottom 추가 */}
      <div className="flex-1 overflow-auto space-y-3 pb-24">
        <Checklist
          step={step}
          purpose={purpose} setPurpose={setPurpose}
          budget={budget} setBudget={setBudget}
          who={who} setWho={setWho}
          items={items} toggleItem={toggleItem}
          specialMode={specialMode} setSpecialMode={setSpecialMode}
          specialText={specialText} setSpecialText={setSpecialText}
        />
      </div>

      {/* 하단 플로팅 버튼 (고정) */}
      <div
        className="
          fixed left-1/2 -translate-x-1/2 w-[22.5rem] px-5 z-10
        "
        style={{ bottom: "max(24px, env(safe-area-inset-bottom))" }}
      >
        <Button
          variant="step"
          isActive={stepDone}
          isFinal={step === TOTAL_STEPS - 1}
          onClick={handleNext}
          className="w-full h-12 rounded-2xl shadow-sm"
        >
          {step === TOTAL_STEPS - 1 ? "완료" : "다음"}
        </Button>
      </div>
    </main>
  );
}