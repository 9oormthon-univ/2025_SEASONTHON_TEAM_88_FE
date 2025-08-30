import logo from "../../assets/icons/main.svg";
import chevron from "../../assets/icons/chevron-right-small.png";

export default function Login() {
  return (
    <main className="w-[22.5rem] h-[46.25rem] mx-auto bg-white flex flex-col items-center">
      {/* 아이콘/브랜드 영역 */}
      <section className="mt-20 flex flex-col items-center justify-center">
        {/* 로고 아이콘 (3.0625rem × 4.04575rem) */}
        <img
          src={logo}
          alt="Eventory"
          className="w-[3.0625rem] h-[4.04575rem] object-contain"
        />

        {/* 브랜드 텍스트 (요청값 그대로) */}
        <h1
          className="w-[10.5rem] h-[2.25rem] flex flex-col justify-center text-center text-[1.875rem] font-normal leading-[9.375rem] text-[#8371FD]"
          style={{ fontFamily: '"neurimbo Gothic", sans-serif' }}
        >
          Eventory
        </h1>
      </section>

      {/* 소셜/기타 로그인 버튼들 (샘플) */}
      <section className="mt-10 w-full px-5 space-y-3">
        {/* 카카오 */}
        <button className="w-full h-12 rounded-full bg-[#FEE500] text-black font-medium">
          카카오로 로그인
        </button>

        {/* 네이버 */}
        <button className="w-full h-12 rounded-full bg-[#03C75A] text-white font-medium">
          네이버로 로그인
        </button>

        {/* 애플 */}
        <button className="w-full h-12 rounded-full border border-gray-300 bg-white text-black font-medium">
          Apple로 로그인
        </button>

        {/* 휴대폰 번호 */}
        <button className="w-full h-12 rounded-full border border-gray-300 bg-white text-black font-medium">
          휴대폰번호로 로그인
        </button>
      </section>

      {/* 이메일 회원가입 링크 */}
      <div className="mt-auto mb-8 flex items-center gap-1 text-sm text-gray-600">
        <span>이메일로 회원가입</span>
        <img src={chevron} alt="" className="w-3 h-3" />
      </div>
    </main>
  );
}