// src/pages/intro/Login.jsx
import logo from "../../assets/icons/main.svg";
import chevron from "../../assets/icons/chevron-right-small.svg";
import kakaoIcon from "../../assets/icons/Kakao.svg";
import naverIcon from "../../assets/icons/Naver.svg";

export default function Login() {
  return (
    <main
      className={[
        "w-[22.5rem] h-[46.25rem] mx-auto bg-white",
        "flex flex-col items-center font-pretendard",
        "pb-[max(1.31069rem,env(safe-area-inset-bottom))]"
      ].join(" ")}
    >
      {/* 상단 로고 블록 */}
      <section className="flex flex-col items-center flex-grow justify-center gap-[10px]">
        {/* 로고 아이콘: 49 × 64.73(px) */}
        <img
          src={logo}
          alt="Eventory"
          className="w-[49px] h-[64.73px] object-contain"
        />

        {/* 브랜드 텍스트 */}
        <h1
          className="
            font-neurimbo
            w-[168px] h-[36px]
            flex items-center justify-center
            text-[30px] font-normal text-[#8371FD]
            leading-[150px]
            text-center
          "
        >
          Eventory
        </h1>
      </section>

      {/* 소셜/기타 로그인 버튼들 */}
      <section className="mt-auto w-full px-5 space-y-4">
        {/* 카카오 */}
        <button
          type="button"
          className="w-full h-12 rounded-full bg-[#FEE500] text-black font-medium flex items-center justify-center gap-2"
          aria-label="카카오로 로그인"
        >
          <img src={kakaoIcon} alt="카카오" className="w-5 h-5" />
          카카오로 로그인
        </button>
      </section>

      {/* 이메일 회원가입 링크 */}
      <div className="mt-4 mb-4 flex items-center gap-1 text-sm text-gray-600">
        <span>이메일로 회원가입</span>
        <img src={chevron} alt="" className="w-3 h-3" />
      </div>
    </main>
  );
}