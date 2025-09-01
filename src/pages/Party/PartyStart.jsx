import { useState } from "react";

// The entire application is contained in a single file to prevent module resolution errors.

// This is the main application component.
export default function App() {
  // Common component for question cards
  const QuestionCard = ({ title, children }) => {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <h3 className="text-[#323639] text-[1.0625rem] font-semibold mb-4">
          {title}
        </h3>
        {children}
      </div>
    );
  };

  // Common component for option items (radio/checkbox)
  const OptionItem = ({ label, selected, onClick, type = "radio" }) => {
    const isRadio = type === "radio";
    return (
      <button
        type="button"
        onClick={onClick}
        className={`
          w-full flex items-center gap-3 rounded-xl px-4 h-12
          border-2 transition-colors
          ${selected ? "border-[#8371FD] bg-white" : "border-[#E4E8EB] bg-white hover:border-[#C9CFD5]"}
          mb-3
        `}
        aria-pressed={selected}
      >
        {/* Custom indicator */}
        <span
          className={`
            flex items-center justify-center shrink-0
            ${isRadio ? "w-5 h-5 rounded-full border" : "w-5 h-5 rounded-md border"}
            ${selected ? "border-[#8371FD]" : "border-[#C9CFD5]"}
          `}
        >
          {selected && (
            <span
              className={`
                ${isRadio ? "w-2.5 h-2.5 rounded-full" : "w-3 h-3 rounded-[4px]"}
                bg-[#8371FD]
              `}
            />
          )}
        </span>
        <span className="text-[0.95rem] text-[#323639]">{label}</span>
      </button>
    );
  };

  const MobileScreen = ({ children }) => {
    return (
      <div className="flex flex-col h-screen max-w-sm mx-auto bg-gray-50 overflow-auto">
        {children}
      </div>
    );
  };

  const TopBar = ({ title }) => {
    return (
      <div className="sticky top-0 z-10 px-5 pt-5 pb-3 bg-gray-50">
        <div className="flex items-center justify-between">
          <button className="text-[#A2A9B0] text-xl">&lt;</button>
          <span className="text-lg font-semibold text-[#323639]">{title}</span>
          <div className="w-6"></div>
        </div>
      </div>
    );
  };

  const ProgressBar = ({ value }) => {
    return (
      <div className="px-5">
        <div className="h-2 rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#8371FD] transition-all duration-500"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };

  const BottomCTA = ({ active, onClick, children }) => {
    return (
      <div className="sticky bottom-0 z-10 p-5 bg-white shadow-top">
        <button
          onClick={onClick}
          className={`w-full h-12 rounded-xl text-white font-semibold transition-colors
            ${active ? "bg-[#8371FD]" : "bg-[#C9CFD5] cursor-not-allowed"}
          `}
          disabled={!active}
        >
          {children}
        </button>
      </div>
    );
  };

  // Question data
  const QUESTIONS = [
    {
      title: "파티의 목적이 무엇인가요?",
      options: [
        "생일",
        "기념일",
        "프로포즈",
        "홈파티",
        "졸업/입학",
        "돌잔치",
        "브라이덜샤워",
        "젠더리빌",
        "기타",
      ],
      type: "radio",
      stateKey: "purpose",
    },
    {
      title: "예산 범위를 선택해주세요",
      options: [
        "2~4만원대",
        "4~6만원대",
        "6~8만원대",
        "8~10만원대",
        "10만원 이상",
      ],
      type: "radio",
      stateKey: "budget",
    },
    {
      title: "누구와 함께할 파티인가요?",
      options: ["나를 위해", "연인", "가족", "친구", "동료/지인", "기타"],
      type: "radio",
      stateKey: "together",
    },
    {
      title: "구매 항목을 선택해주세요",
      options: ["케이크", "꽃", "풍선", "와인", "주얼리", "기타"],
      type: "checkbox",
      stateKey: "items",
    },
  ];

  // State to manage the current step and form data
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    purpose: "",
    budget: "",
    together: "",
    items: [],
  });

  const currentQuestion = QUESTIONS[step];

  const handleOptionClick = (label) => {
    if (currentQuestion.type === "radio") {
      setFormData({
        ...formData,
        [currentQuestion.stateKey]: label,
      });
    } else if (currentQuestion.type === "checkbox") {
      setFormData((prev) => {
        const currentItems = prev[currentQuestion.stateKey];
        const newItems = currentItems.includes(label)
          ? currentItems.filter((v) => v !== label)
          : [...currentItems, label];
        return {
          ...prev,
          [currentQuestion.stateKey]: newItems,
        };
      });
    }
  };

  const canNext =
    currentQuestion.type === "radio"
      ? !!formData[currentQuestion.stateKey]
      : formData[currentQuestion.stateKey].length > 0;

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Last step, do something with the data
      console.log("Final Form Data:", formData);
    }
  };

  const progressValue = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <MobileScreen>
      {/* Top area */}
      <TopBar title="내 파티 시작하기" />
      <div className="mt-3">
        <ProgressBar value={progressValue} />
      </div>

      {/* Main content */}
      <section className="px-5 mt-5 pb-2">
        <QuestionCard title={currentQuestion.title}>
          {currentQuestion.options.map((option) => (
            <OptionItem
              key={option}
              label={option}
              selected={
                currentQuestion.type === "radio"
                  ? formData[currentQuestion.stateKey] === option
                  : formData[currentQuestion.stateKey].includes(option)
              }
              onClick={() => handleOptionClick(option)}
              type={currentQuestion.type}
            />
          ))}
        </QuestionCard>
      </section>

      {/* Bottom CTA */}
      <BottomCTA active={!!canNext} onClick={handleNext}>
        {step === QUESTIONS.length - 1 ? "완료" : "다음"}
      </BottomCTA>
    </MobileScreen>
  );
}