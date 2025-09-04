// src/pages/Party/PartyRecommend.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// 🔹 이미지 에셋
import heroImg from "../../assets/images/adver1.svg";
import badgeGift from "../../assets/images/bear.svg";
import bannerImg from "../../assets/images/special_banner.svg";

import ideaBouquet from "../../assets/images/bouquet.svg";
import ideaCandle from "../../assets/images/candle.svg";
import ideaFlower from "../../assets/images/flower.svg";
import ideaDiffuser from "../../assets/images/diffuser.svg";
import ideaCard from "../../assets/images/card.svg";
import ideaChoco from "../../assets/images/choco.svg";

import prodFlower from "../../assets/images/flower.svg";
import prodCard from "../../assets/images/card.svg";
import prodCandle from "../../assets/images/candle.svg";
import prodTea from "../../assets/images/tea.svg";

const SIMILAR_ITEMS = [
  { id: 1, title: "라브앤프로포즈 커플 우정반지 세트", price: 45000, img: prodCard },
  { id: 2, title: "플로리스트엣닷 프리미엄 생화 꽃다발", price: 32000, img: prodFlower },
  { id: 3, title: "파티메이커 홈파티 미니 키트", price: 32000, img: prodCandle },
  { id: 4, title: "로맨틱 티타임 세트", price: 15000, img: prodTea },
];

const PACKAGE_ITEMS = [
  { key: "flower", label: "생화 꽃다발 구매하기", price: 10000, img: ideaBouquet },
  { key: "balloon", label: "하트 풍선 세트 구매하기", price: 10000, img: ideaCandle },
  { key: "couple", label: "커플링 구매하기", price: 10000, img: ideaCard },
  { key: "setup", label: "프로포즈 세팅하기", price: 10000, img: ideaDiffuser },
];

const IDEA_GRID = [
  { id: "bqt", label: "꽃다발", img: ideaBouquet },
  { id: "neck", label: "주얼리", img: ideaCard },
  { id: "sun", label: "꽃다발", img: ideaFlower },
  { id: "balloon", label: "풍선", img: ideaCandle },
  { id: "arr", label: "플라워", img: ideaDiffuser },
  { id: "choco", label: "초콜릿", img: ideaChoco },
];

export default function PartyRecommend() {
  const nav = useNavigate();
  const [selected, setSelected] = useState([]);

  const sum = useMemo(
    () =>
      selected.reduce((acc, key) => {
        const found = PACKAGE_ITEMS.find((x) => x.key === key);
        return acc + (found ? found.price : 0);
      }, 0),
    [selected]
  );

  const toggle = (key) =>
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  return (
    <main
      className={[
        "w-[22.5rem] h-[46.25rem] mx-auto",
        "bg-black text-white font-pretendard",
        "flex flex-col",
      ].join(" ")}
    >
      {/* 상단 다크 히어로 */}
      <header className="relative px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-4 overflow-hidden">
        <img
          src={heroImg}
          alt=""
            /* 배경 일러스트 */
          className="absolute right-0 top-2 w-[180px] opacity-60 pointer-events-none select-none"
        />
        <div className="relative z-[1]">
          <div className="flex items-center justify-between">
            <div className="text-[#A697FF] text-[14px]">내 파티</div>
            <div className="flex items-center gap-3">
              <button aria-label="알림" className="p-2 -m-2 opacity-90">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Z" fill="currentColor"/>
                  <path d="M18 16V11a6 6 0 0 0-12 0v5l-2 2h16l-2-2Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button aria-label="카트" className="p-2 -m-2 opacity-90">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6h15l-2 9H8L6 3H3" stroke="currentColor" strokeWidth="2" />
                  <circle cx="10" cy="20" r="1.5" fill="currentColor" />
                  <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          <h1 className="mt-2 text-[18px] font-semibold">토리님의 파티 공간이에요</h1>
          <p className="mt-1 text-[12px] text-white/70">
            나만의 파티를 추가해 보거나, 기존 파티를 관리해보세요.
          </p>

          <button
            onClick={() => nav("/party/start")}
            className="mt-3 w-full h-10 rounded-xl bg-[#7F6BFF] text-white text-[14px] font-semibold active:opacity-90 flex items-center justify-center gap-2"
          >
            <img src={badgeGift} alt="" className="w-5 h-5" />
            내 파티 추가하기
          </button>
        </div>
      </header>

      {/* 본문 (라운드 탑) */}
      <section className="flex-1 overflow-auto bg-white text-black rounded-t-3xl">
        <div className="px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-6">
          {/* 진행 카드 */}
          <div className="bg-gradient-to-r from-[#EFE8FF] to-[#F7F4FF] rounded-2xl p-3">
            <div className="flex items-center justify-between text-[12px] text-gray-700">
              <span>준비 시작</span>
              <span>준비 완료</span>
            </div>
            <div className="mt-2 relative">
              <div className="h-2 rounded-full bg-white/60" />
              <div
                className="absolute left-0 top-0 h-2 rounded-full bg-[#7F6BFF]"
                style={{ width: "35%" }}
              />
              <img
                src={badgeGift}
                alt=""
                className="absolute -translate-y-2 w-7 h-7"
                style={{ left: "33%" }}
              />
            </div>
          </div>

          {/* 체크리스트 카드 */}
          <div className="bg-white rounded-2xl shadow-[0_1px_0_rgba(0,0,0,0.06)] p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold">프로포즈 8만원대 패키지</h3>
              <span className="text-[12px] text-gray-500">진행중</span>
            </div>

            <ul className="mt-3 space-y-2">
              {PACKAGE_ITEMS.map((it) => {
                const active = selected.includes(it.key);
                return (
                  <li key={it.key}>
                    <button
                      type="button"
                      onClick={() => toggle(it.key)}
                      className={[
                        "w-full rounded-xl border px-3 py-3 flex items-center gap-3",
                        active ? "border-[#7F6BFF] bg-[#F6F3FF]" : "border-gray-200 bg-white",
                      ].join(" ")}
                    >
                      <img src={it.img} alt="" className="w-6 h-6" />
                      <span className="text-[14px] text-gray-800 flex-1 text-left">
                        {it.label}
                      </span>
                      <span className="text-[12px] text-gray-500 mr-2">
                        {it.price.toLocaleString()}원
                      </span>
                      <span
                        className={[
                          "w-5 h-5 rounded border grid place-items-center",
                          active ? "border-[#7F6BFF]" : "border-gray-300",
                        ].join(" ")}
                        aria-hidden
                      >
                        <span
                          className={[
                            "w-2.5 h-2.5 rounded",
                            active ? "bg-[#7F6BFF]" : "bg-transparent",
                          ].join(" ")}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              disabled={selected.length === 0}
              className={[
                "mt-4 w-full h-11 rounded-xl text-[14px] font-semibold",
                selected.length === 0
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "bg-gray-900 text-white active:opacity-90",
              ].join(" ")}
            >
              리스트 추가하기 · 합계 {sum.toLocaleString()}원
            </button>
          </div>

          {/* 쿠폰/배너 */}
          <div className="relative rounded-2xl overflow-hidden">
            <img src={bannerImg} alt="회원 쿠폰 배너" className="w-full h-12 object-cover" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-[12px] font-semibold bg-[#7F6BFF] px-2 py-0.5 rounded-full">
              20%
            </span>
          </div>

          {/* 아이디어 그리드 */}
          <section>
            <h4 className="text-[14px] font-semibold mb-3">프로포즈 세팅 아이디어</h4>
            <div className="grid grid-cols-3 gap-3">
              {IDEA_GRID.map((it) => (
                <figure
                  key={it.id}
                  className="rounded-2xl overflow-hidden border border-gray-200 bg-white"
                >
                  <div className="h-24 grid place-items-center bg-gray-50">
                    <img src={it.img} alt={it.label} className="w-14 h-14" />
                  </div>
                  <figcaption className="p-2 text-[12px] text-gray-700">{it.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* 유사 아이템 가로 스크롤 */}
          <section>
            <h4 className="text-[14px] font-semibold mb-3">찜한 상품과 비슷한 아이템</h4>
            <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-3 pr-2">
                {SIMILAR_ITEMS.map((it) => (
                  <div
                    key={it.id}
                    className="min-w-[8.5rem] w-[8.5rem] rounded-2xl border border-gray-200 overflow-hidden bg-white"
                  >
                    <div className="h-24 grid place-items-center bg-gray-50">
                      <img src={it.img} alt="" className="w-14 h-14" />
                    </div>
                    <div className="p-2">
                      <p className="text-[12px] text-gray-800 line-clamp-2 min-h-[2.25rem]">
                        {it.title}
                      </p>
                      <div className="mt-1 text-[13px] font-semibold">
                        {it.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 하단 안내바 */}
          <div className="rounded-2xl border border-[#E7E1FF] bg-[#F6F3FF] text-[#6E59FF] px-3 py-3 text-[13px]">
            토리님의 특별한 날, 잊지 않도록
            <button className="ml-2 underline">기념일 등록하기</button>
          </div>
        </div>
      </section>
    </main>
  );
}