// src/pages/intro/LoginPhone.jsx
import { useEffect, useState } from "react";
import backArrow from "../../assets/icons/chevron-left.svg";
import checkIcon from "../../assets/icons/check-small.svg";
import warnIcon from "../../assets/icons/warning-small.svg";

export default function LoginPhone() {
  // states
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("default"); // default | typing | valid | error
  const [code, setCode] = useState("");
  const [codeActive, setCodeActive] = useState(false);
  const [sent, setSent] = useState(false);
  const [sec, setSec] = useState(0);

  // helpers
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r < 10 ? "0" : ""}${r}`;
  };

  const formatPhone = (digits) => {
    // 010-1234-5678 형태
    const d = digits.replace(/[^\d]/g, "").slice(0, 11);
    if (d.length < 4) return d;
    if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  };

  // phone change
  const onChangePhone = (e) => {
    const raw = e.target.value;
    const digits = raw.replace(/[^\d]/g, "");
    setPhone(formatPhone(digits));

    if (digits.length === 0) {
      setState("default");
    } else if (digits.length < 11) {
      setState("typing"); // 입력 중은 회색
    } else if (digits.length === 11) {
      // 010 으로 시작하는 11자리만 유효
      if (/^010\d{8}$/.test(digits)) setState("valid");
      else setState("error");
    } else {
      setState("error");
    }
  };

  // send code
  const onSend = () => {
    if (state !== "valid") return;
    setSent(true);
    setCodeActive(true);
    setSec(180); // 3분
  };

  // timer
  useEffect(() => {
    if (!sent || sec <= 0) return;
    const t = setInterval(() => setSec((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [sent, sec]);

  // ---- 스타일 (Figma 반영) ----
  // 상태별 input class
  const phoneInputClass = (() => {
    const base =
      "w-full h-12 rounded-md outline-none transition-colors bg-white " +
      "placeholder:font-normal text-[1rem] leading-[1.6rem] " + // Body 01
      "pl-[0.875rem] border-[1.5px]";

    // 기본/입력중: 버튼 공간 확보
    if (state === "typing")
      return (
        base +
        " pr-[6.0625rem] border-[#81878B] text-[#81878B] placeholder:text-[#81878B]"
      );
    if (state === "default")
      return (
        base +
        " pr-[6.0625rem] border-[#B1B7BC] text-[#81878B] placeholder:text-[#81878B]"
      );

    // 유효/오류: 오른쪽 아이콘 공간 확보(32px)
    if (state === "valid")
      return (
        base +
        " pr-[2rem] border-[#B1B7BC] text-[#323639] placeholder:text-[#323639]"
      );
    if (state === "error")
      return (
        base +
        " pr-[2rem] border-[#E31E1E] text-[#E31E1E] placeholder:text-[#E31E1E]"
      );

    return base;
  })();

  // 라벨 (Caption 02)
  const labelClass =
    "text-[#B1B7BC] text-[0.75rem] font-medium leading-[1.2rem]";

  // 인증 버튼
  const sendBtnClass =
    "flex-shrink-0 w-[5.625rem] h-[2.375rem] rounded-[6.25rem] " + // 90×38
    "text-[1rem] font-semibold leading-[1.4rem] " +
    (state === "valid"
      ? "bg-[#8371FD] text-white"
      : "bg-[#F5F5F5] text-[#B1B7BC]");

  return (
    <main
      className={[
        "w-[22.5rem] h-[46.25rem] mx-auto bg-white",
        "flex flex-col font-pretendard",
        "pb-[max(1.31069rem,env(safe-area-inset-bottom))]",
      ].join(" ")}
    >
      {/* 상단 바 */}
      <nav className="flex items-center w-full h-12 mt-[3.5rem] px-5">
        <button type="button" aria-label="뒤로가기">
          <img src={backArrow} alt="뒤로가기" className="w-6 h-6" />
        </button>
      </nav>

      {/* 본문 */}
      <section className="px-5 mt-[1.25rem] space-y-[1.25rem]">
        <h1 className="text-xl font-semibold text-[#323639] leading-[140%]">
          휴대폰 인증을 해주세요
        </h1>

        {/* 휴대폰 번호 */}
        <div className="space-y-[0.875rem]">
          <label className={labelClass}>휴대폰 번호</label>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="tel"
                value={phone}
                onChange={onChangePhone}
                placeholder="010-1234-5678"
                className={phoneInputClass}
              />
              {/* 상태 아이콘 */}
              {state === "valid" && (
                <img
                  src={checkIcon}
                  alt="유효"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                />
              )}
              {state === "error" && (
                <img
                  src={warnIcon}
                  alt="오류"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                />
              )}
            </div>

            <button
              type="button"
              disabled={state !== "valid"}
              onClick={onSend}
              className={sendBtnClass}
            >
              {sent ? "재인증" : "인증받기"}
            </button>
          </div>

          {/* 오류 메시지 */}
          {state === "error" && (
            <p className="text-[#E31E1E] text-xs font-medium mt-[0.25rem]">
              올바른 휴대폰 번호를 입력해주세요.
            </p>
          )}
        </div>

        {/* 인증번호 */}
        <div className="space-y-[0.875rem]">
          <label className={labelClass}>인증번호</label>

          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="인증번호 6자리"
              disabled={!codeActive}
              className={[
                "w-full h-12 rounded-md outline-none text-base",
                "pl-[0.875rem] pr-[0.875rem] border",
                codeActive ? "bg-white border-gray-300" : "bg-[#F5F5F5] border-gray-300",
              ].join(" ")}
            />
            {sent && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#8371FD]">
                {sec > 0 ? formatTime(sec) : "시간만료"}
              </span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}