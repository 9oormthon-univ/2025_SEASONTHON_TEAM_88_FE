// src/pages/signup/SignupSuccess.jsx

import { useLocation, useNavigate } from "react-router-dom";
import signupIcon from "../../assets/icons/signup.svg";

export default function SignupSuccess() {
  const nav = useNavigate();
  const location = useLocation();
  const userName = location.state?.name || "토리님";

  return (
    <main className="w-[22.5rem] h-[46.25rem] mx-auto bg-white flex flex-col items-center justify-center font-pretendard pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="flex flex-col items-center">
        {/* 가입 완료! */}
        <h1 className="text-[22px] font-medium text-[#8371FD] mb-6">가입 완료!</h1>
        <img src={signupIcon} alt="가입 완료 아이콘" className="w-[8rem] mb-8" />
        <p className="text-base font-medium text-[#323639] text-center">
          <span className="font-bold">{userName}</span>, 이벤트토리와 함께
          <br />
          즐거운 파티 준비를 시작해볼까요?
        </p>
      </div>
    </main>
  );
}