// src/pages/intro/EmailSignup.jsx
import { useState } from 'react';
import backArrow from "../../assets/icons/chevron-left.svg";
import checkIcon from "../../assets/icons/check-small.svg";
import exclamationIcon from "../../assets/icons/warning-small.svg";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailState, setEmailState] = useState("default"); // 'default', 'typing', 'valid', 'error'
  const [passwordState, setPasswordState] = useState("default"); // 'default', 'typing', 'valid', 'error'

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // 영문, 숫자, 특수문자 포함 8자 이상
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length > 0) {
      setEmailState("typing");
      if (validateEmail(value)) {
        setEmailState("valid");
      } else {
        setEmailState("error");
      }
    } else {
      setEmailState("default");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0) {
      setPasswordState("typing");
      if (validatePassword(value)) {
        setPasswordState("valid");
      } else {
        setPasswordState("error");
      }
    } else {
      setPasswordState("default");
    }
  };

  const getInputClass = (state) => {
    let baseClass = "w-full h-12 px-4 rounded-md border-2 text-base outline-none transition-colors";
    if (state === "error") {
      return `${baseClass} border-[#E53935] text-[#E53935] placeholder:text-[#E53935] focus:border-[#E53935]`;
    }
    if (state === "valid" || state === "typing") {
      return `${baseClass} border-[#8371FD] focus:border-[#8371FD]`;
    }
    return `${baseClass} border-gray-300 focus:border-[#8371FD]`;
  };
  
  const getLabelColorClass = (state) => {
      if (state === "valid" || state === "typing") {
          return "text-[#8371FD]";
      }
      if (state === "error") {
          return "text-[#E53935]";
      }
      return "text-[#B1B7BC]";
  };

  return (
    <main
      className={[
        "w-[22.5rem] h-[46.25rem] mx-auto bg-white",
        "flex flex-col font-pretendard",
        "pb-[max(1.31069rem,env(safe-area-inset-bottom))]"
      ].join(" ")}
    >
      {/* 상단 네비게이션 바 */}
      <nav
        className="
          flex items-center
          w-full h-12
          mt-[3.5rem]
          px-5
        "
      >
        <button type="button" aria-label="뒤로가기">
          <img src={backArrow} alt="뒤로가기" className="w-6 h-6" />
        </button>
      </nav>

      {/* 본문 콘텐츠 */}
      <section className="px-5 mt-[1.25rem] space-y-[1.25rem]">
        {/* 제목 */}
        <h1 className="text-xl font-semibold text-[#323639] leading-[140%]">
          이메일과 비밀번호를<br/>입력해주세요.
        </h1>

        {/* 이메일 입력 필드 */}
        <div className="space-y-[0.875rem]">
          <label htmlFor="email" className={`text-sm font-medium ${getLabelColorClass(emailState)}`}>
            이메일 주소
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="abc@email.com"
              className={getInputClass(emailState)}
            />
            {emailState === 'valid' && (
              <img src={checkIcon} alt="유효함" className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2" />
            )}
            {emailState === 'error' && (
              <img src={exclamationIcon} alt="오류" className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2" />
            )}
          </div>
          {emailState === 'error' && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-[#E53935] font-medium">올바른 이메일을 입력해주세요.</span>
            </div>
          )}
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="space-y-[0.875rem]">
          <label htmlFor="password" className={`text-sm font-medium ${getLabelColorClass(passwordState)}`}>
            비밀번호
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              className={getInputClass(passwordState)}
            />
            {passwordState === 'valid' && (
              <img src={checkIcon} alt="유효함" className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2" />
            )}
            {passwordState === 'error' && (
              <img src={exclamationIcon} alt="오류" className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2" />
            )}
          </div>
          {passwordState === 'error' && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-[#E53935] font-medium">영문, 숫자, 특수문자를 모두 포함해주세요.</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}