// src/pages/intro/Signup.jsx
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/icons/chevron-left.svg";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <main className="w-[22.5rem] h-[46.25rem] mx-auto bg-white font-pretendard flex flex-col relative">
      {/* 뒤로가기 버튼 (상태바 고려해서 살짝 아래에 배치) */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-[40px]"
        aria-label="뒤로가기"
      >
        <img src={backIcon} alt="" className="w-6 h-6" />
      </button>

      {/* 제목 */}
      <h2 className="mt-[80px] px-4 text-[1.25rem] font-semibold leading-[1.75rem] text-[#323639]">
        휴대폰 인증을 해주세요
      </h2>

      {/* 입력 영역 */}
      <section className="mt-6 px-4 space-y-4">
        {/* 휴대폰 번호 */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">휴대폰 번호</label>

          {/* 인풋 래퍼: Figma 스펙 (padding/border/radius) */}
          <div
            className="
              relative flex items-center
              rounded-md border border-[#B1B7BC]
              bg-white
              py-[0.4375rem] pl-[0.875rem] pr-[6.375rem]
            "
          >
            <input
              type="tel"
              inputMode="numeric"
              placeholder="010-1234-5678"
              className="
                w-full bg-transparent outline-none
                text-[1rem] leading-[1.4rem]
                placeholder:text-[#9BA1A6]
              "
            />

            {/* 인증받기 버튼: Figma 스펙 그대로 */}
            <button
              type="button"
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                w-[5.625rem] h-[2.375rem]
                px-[1.1875rem] py-[0.3125rem]
                flex justify-center items-center gap-[0.625rem]
                rounded-full
                bg-[#F5F5F5] text-[#B1B7BC]
                text-[1rem] font-semibold leading-[1.4rem]
              "
            >
              인증받기
            </button>
          </div>
        </div>

        {/* 인증번호 */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">인증번호</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="인증번호 6자리"
            className="
              w-full rounded-md border border-[#B1B7BC] bg-white
              py-[0.4375rem] pl-[0.875rem] pr-[0.875rem]
              text-[1rem] leading-[1.4rem]
              placeholder:text-[#9BA1A6] outline-none
            "
          />
        </div>
      </section>
    </main>
  );
}