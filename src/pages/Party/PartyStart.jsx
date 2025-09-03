// src/pages/party/StartPartyPurpose.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const PURPOSE_OPTIONS = [
  "생일", "기념일", "프로포즈", "홈파티",
  "졸업/입학", "돌잔치", "브라이덜샤워", "젠더리빌", "기타",
];

const BUDGET_OPTIONS = [
  "2~4만원대", "4~6만원대", "6~8만원대", "8~10만원대", "10만원 이상", "기타",
];

const WHO_OPTIONS = ["나를 위해", "연인", "가족", "친구", "동료/지인", "기타"];

const ITEM_OPTIONS = ["케이크", "꽃", "풍선", "와인", "주얼리", "기타"];

const TOTAL_STEPS = 6; // 1~5 선택 단계 + 6 완료

export default function StartPartyPurpose() {
  const nav = useNavigate();

  // 전체 폼 상태
  const [purpose, setPurpose] = useState("");
  const [budget, setBudget] = useState("");
  const [who, setWho] = useState("");
  const [items, setItems] = useState([]); // REMOVED <string[]>
  const [specialMode, setSpecialMode] = useState(""); // REMOVED <"없음" | "직접입력" | "">
  const [specialText, setSpecialText] = useState("");

  // 현재 단계 (0~5)
  const [step, setStep] = useState(0);

  // 각 단계 완료 여부
  const stepDone = useMemo(() => {
    switch (step) {
      case 0: return !!purpose;
      case 1: return !!budget;
      case 2: return !!who;
      case 3: return items.length > 0;           
      case 4: return specialMode === "없음" || (specialMode === "직접입력" && specialText.trim().length > 0);
      case 5: return true; 
      default: return false;
    }
  }, [step, purpose, budget, who, items, specialMode, specialText]);


  const percent = useMemo(() => {
    const finished = Math.min(step, TOTAL_STEPS - 1); 
    const completedSteps = finished + (stepDone ? 1 : 0);
    return Math.round((completedSteps / TOTAL_STEPS) * 100);
  }, [step, stepDone]);

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else nav(-1);
  };

  const goClose = () => {

    nav(-1);
  };

  const handleNext = () => {
    if (!stepDone) return;
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else {
      nav("/party");
    }
  };

  const toggleItem = (label) => {
    setItems((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  // 공통 컴포넌트들
  const Header = () => (
    <header className="px-5 mb-2">
      <div className="flex items-center justify-between">
        <button aria-label="뒤로가기" onClick={goBack} className="p-2 -m-2">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-[17px] font-semibold">내 파티 시작하기</h1>
        <button aria-label="닫기" onClick={goClose} className="p-2 -m-2">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 진행 바 + 퍼센트 */}
      <div className="mt-3">
        <div className="h-[3px] rounded bg-gray-200 relative overflow-hidden">
          <div
            className="h-full bg-[#8371FD] transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-1 text-[12px] text-gray-500 text-right">{percent}%</div>
      </div>
    </header>
  );

  const Card = ({ title, subtitle, children }) => (
    <section className="px-5">
      <div className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4">
        <p className="mb-2 text-[16px] font-semibold text-gray-900">{title}</p>
        {subtitle && <p className="mb-3 text-[12px] text-gray-500">{subtitle}</p>}
        {children}
      </div>
    </section>
  );

  const RadioRow = ({ label, active, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full h-12 rounded-xl border flex items-center px-3 justify-between",
        "transition-colors mb-3",
        active ? "border-[#8371FD]/40 bg-[#F3F0FF]" : "border-gray-200 bg-white",
      ].join(" ")}
      aria-pressed={active}
    >
      <span className="text-[14px] text-gray-800">{label}</span>
      <span
        className={[
          "w-5 h-5 rounded-full border grid place-items-center shrink-0",
          active ? "border-[#8371FD] bg-white" : "border-gray-300 bg-white",
        ].join(" ")}
        aria-hidden
      >
        <span className={["w-2.5 h-2.5 rounded-full", active ? "bg-[#6C54FF]" : "bg-transparent"].join(" ")} />
      </span>
    </button>
  );

  const CheckRow = ({ label, checked, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full h-12 rounded-xl border flex items-center px-3 justify-between",
        "transition-colors mb-3",
        checked ? "border-[#8371FD]/40 bg-[#F8F6FF]" : "border-gray-200 bg-white",
      ].join(" ")}
      aria-pressed={checked}
    >
      <span className="text-[14px] text-gray-800">{label}</span>
      <span
        className={[
          "w-5 h-5 rounded-md border grid place-items-center shrink-0",
          checked ? "border-[#8371FD] bg-white" : "border-gray-300 bg-white",
        ].join(" ")}
        aria-hidden
      >
        <svg width="14" height="14" viewBox="0 0 24 24">
          <path
            d="M5 12l4 4 10-10"
            stroke={checked ? "#6C54FF" : "transparent"}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );

  // 단계별 화면
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Card title="파티의 목적이 무엇인가요?">
            <ul>
              {PURPOSE_OPTIONS.map((label) => (
                <li key={label}>
                  <RadioRow label={label} active={purpose === label} onClick={() => setPurpose(label)} />
                </li>
              ))}
            </ul>
          </Card>
        );

      case 1:
        return (
          <Card title="예산 범위를 선택해주세요">
            <ul>
              {BUDGET_OPTIONS.map((label) => (
                <li key={label}>
                  <RadioRow label={label} active={budget === label} onClick={() => setBudget(label)} />
                </li>
              ))}
            </ul>
          </Card>
        );

      case 2:
        return (
          <Card title="누구와 함께할 파티인가요?">
            <ul>
              {WHO_OPTIONS.map((label) => (
                <li key={label}>
                  <RadioRow label={label} active={who === label} onClick={() => setWho(label)} />
                </li>
              ))}
            </ul>
          </Card>
        );

      case 3:
        return (
          <Card title="구매 항목을 선택해주세요">
            <ul>
              {ITEM_OPTIONS.map((label) => (
                <li key={label}>
                  <CheckRow
                    label={label}
                    checked={items.includes(label)}
                    onClick={() => toggleItem(label)}
                  />
                </li>
              ))}
            </ul>
          </Card>
        );

      case 4:
        return (
          <Card title="특별히 준비해드릴 게 있을까요?" subtitle="(파티 콘셉트, 테마, 색감 등)">
            <div className="mb-3">
              <RadioRow
                label="없음"
                active={specialMode === "없음"}
                onClick={() => { setSpecialMode("없음"); setSpecialText(""); }}
              />
              <div className={["rounded-xl border p-3", specialMode === "직접입력" ? "border-[#8371FD]/40 bg-[#F8F6FF]" : "border-gray-200"].join(" ")}>
                <RadioRow
                  label="직접입력"
                  active={specialMode === "직접입력"}
                  onClick={() => setSpecialMode("직접입력")}
                />
                <textarea
                  disabled={specialMode !== "직접입력"}
                  placeholder="예) 로맨틱한 분위기, 장미꽃 포인트 원해요"
                  value={specialText}
                  onChange={(e) => setSpecialText(e.target.value.slice(0, 255))}
                  className={[
                    "mt-2 w-full h-28 resize-none rounded-lg border p-3 text-[14px] outline-none",
                    "placeholder:text-gray-400",
                    specialMode === "직접입력" ? "bg-white border-gray-200" : "bg-gray-100 border-gray-200 cursor-not-allowed",
                  ].join(" ")}
                />
                <div className="mt-1 text-right text-[12px] text-gray-400">{specialText.length} / 255자</div>
              </div>
            </div>
          </Card>
        );

      case 5:
        return (
          <Card title="">
            <div className="text-[14px] leading-6 text-gray-800">
              <div className="inline-block bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-3">
                <p>
                  <strong>토리님</strong>을 위한 맞춤 패키지를 준비했어요.
                  <br />
                  <strong>완료</strong> 버튼을 누른 뒤, 내 파티에서 만나보세요!
                </p>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <main
      className={[
        "w-[22.5rem] h-[46.25rem] mx-auto bg-[#FAFAFB]",
        "flex flex-col font-pretendard",
        "pt-[max(0.75rem,env(safe-area-inset-top))]",
        "pb-[max(1rem,env(safe-area-inset-bottom))]",
      ].join(" ")}
    >
      <Header />

      {/* 본문 */}
      <div className="flex-1 overflow-auto space-y-3">{renderStep()}</div>

      {/* 하단 버튼 */}
      <div className="mt-auto px-5 pt-2">
        <button
          type="button"
          disabled={!stepDone}
          onClick={handleNext}
          className={[
            "w-full h-12 rounded-xl text-[15px] font-semibold transition-colors",
            step === TOTAL_STEPS - 1
              ? "bg-[#8371FD] text-white"
              : stepDone
              ? "bg-[#8371FD] text-white active:opacity-90"
              : "bg-gray-300 text-white cursor-not-allowed",
          ].join(" ")}
        >
          {step === TOTAL_STEPS - 1 ? "완료" : "다음"}
        </button>
      </div>
    </main>
  );
}