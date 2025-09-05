import React from "react";

/* ------------------------------ */
/*              ASSETS            */
/* ------------------------------ */
import imgBouquet from "../../assets/images/flower.svg";
import imgBalloons from "../../assets/images/candle.svg";
import imgEarring from "../../assets/images/card.svg";

/* ------------------------------ */
/*            DATA SET            */
/* ------------------------------ */
export const PURPOSE_OPTIONS = [
  "생일","기념일","프로포즈","홈파티","졸업/입학","돌잔치","브라이덜샤워","젠더리빌","기타",
];

export const BUDGET_OPTIONS = [
  "1만원미만","1~2만원대","3~4만원대","5~6만원대","7~8만원대","9~10만원대","10만원 이상","기타",
];

export const WHO_OPTIONS = ["나를 위해","연인","가족","친구","동료/지인","기타"];

const BUY_GROUPS = [
  { title: "식품", items: ["케이크","쿠키","음료","베이커리","떡","전통간식","초콜릿","사탕","건강식품"] },
  { title: "소품", items: ["풍선","가랜드","천수막","캔들","꽃/화분","테이블웨어","조명","장식","키트"] },
  { title: "주얼리", items: ["반지","팔찌","귀걸이","목걸이","발찌","헤어 악세사리","커플세트","시계"] },
  { title: "문구", items: ["카드","편지지","포장","휴대폰 케이스","그립톡","스티커","키링"] },
];

/** 예산 맞춤 패키지 샘플 */
export const PACKAGES = [
  {
    id: 7,
    title: "7만원대 맞춤 패키지",
    emoji: "🛍️",
    compose: "꽃다발 + 풍선 + 주얼리",
    items: [
      { id: "b1", label: "꽃다발", name: "향기 톡립 꽃다발", price: 10000, img: imgBouquet },
      { id: "p1", label: "풍선", name: "메탈릭 파티 풍선 10p", price: 10000, img: imgBalloons },
      { id: "e1", label: "귀걸이", name: "레미 심플 귀걸이", price: 60000, img: imgEarring },
    ],
  },
  {
    id: 8,
    title: "8만원대 맞춤 패키지",
    emoji: "🎀",
    compose: "꽃다발 + 풍선 + 주얼리",
    items: [
      { id: "b2", label: "꽃다발", name: "향기 톡립 꽃다발", price: 10000, img: imgBouquet },
      { id: "p2", label: "풍선", name: "메탈릭 파티 풍선 10p", price: 10000, img: imgBalloons },
      { id: "e2", label: "귀걸이", name: "레미 심플 귀걸이", price: 60000, img: imgEarring },
    ],
  },
];

/* ------------------------------ */
/*            UI PRIMITIVES       */
/* ------------------------------ */

const h2Class =
  "font-pretendard text-[1.25rem] font-semibold leading-[1.75rem] text-[#191A1C]";

/** 기본 칩 (라디오) */
function Chip({ active, children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center",
        "px-[1.25rem] py-[0.5625rem] rounded-[1.25rem]",
        active ? "bg-[#7F6BFF] text-white" : "bg-[#F5F5F5] text-[#646B72] hover:bg-[#EFEFEF]",
        "transition-colors",
        className,
      ].join(" ")}
    >
      <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem]">
        {children}
      </span>
    </button>
  );
}

/** 체크 칩 (다중선택) */
function CheckChip({ checked, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center",
        "px-[12px] py-[5px] rounded-[100px] border",
        checked
          ? "bg-[#7F6BFF] text-white border-[#7F6BFF]"
          : "bg-white text-[#81878B] border-[#B1B7BC]",
        "transition-colors",
      ].join(" ")}
    >
      <span className="font-pretendard text-[12px] font-medium leading-[19px]">
        {children}
      </span>
    </button>
  );
}

function ChipCheckGroup({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <CheckChip
          key={opt}
          checked={selected.includes(opt)}
          onClick={() => onToggle(opt)}
        >
          {opt}
        </CheckChip>
      ))}
    </div>
  );
}

/** 패키지 카드 (선택 시 하단 아이템 노출) */
function PackageCard({ data, selected, onSelect }) {
  // 카드: 배경/테두리 항상 #F8F8F8
  const containerBase =
    "relative w-full rounded-[18px] p-[18px] transition-colors border";
  const containerClass = "bg-[#F8F8F8] border-[#F8F8F8]";

  // Heading/Heading 03 색 전환
  const headingBase =
    "font-pretendard text-[1.125rem] font-semibold leading-[1.575rem]";
  const headingColor = selected ? "text-[#191A1C]" : "text-[#646B72]";

  return (
    <div
      className={[containerBase, containerClass].join(" ")}
      onClick={onSelect}
      role="button"
      tabIndex={0}
    >
      {/* 상단: 제목/설명 + 라디오 */}
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-[12rem]">
          <div className={[headingBase, headingColor].join(" ")}>
            {data.title} <span>{data.emoji}</span>
          </div>
          <div className="mt-2 font-pretendard text-[0.875rem] leading-[1.4rem] text-[#8B90A0]">
            구성: {data.compose}
          </div>
        </div>

        {/* 라디오 버튼 (피그마 스펙) */}
        <div
          className={[
            "ml-auto flex justify-center items-center",
            "w-4 h-4 rounded-full",
            selected ? "border border-[#8371FD] p-[0.1875rem]" : "border border-[#81878B]",
          ].join(" ")}
        >
          {selected && (
            <span className="w-[0.625rem] h-[0.625rem] rounded-full bg-[#8371FD] flex-shrink-0" />
          )}
        </div>
      </div>

      {/* 선택 시에만 상세 아이템 노출 */}
      {selected && (
        <div className="mt-4 w-full flex gap-3">
          {data.items.map((it) => (
            <div key={it.id} className="w-[100px]">
              {/* 썸네일 */}
              <div
                className="relative w-full h-[90px] rounded-[10px] overflow-hidden bg-gray-200"
                style={{
                  backgroundImage: `url(${it.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <span
                  className="absolute left-2 bottom-2 h-4 px-3 rounded-[17px] bg-black/60
                             text-white font-pretendard text-[10px] leading-4"
                >
                  {it.label}
                </span>
              </div>

              {/* 상품명 (Caption 04: 0.625rem / 1rem) */}
              <div className="mt-2 text-[#191A1C] font-pretendard text-[0.625rem] leading-[1rem] truncate">
                {it.name}
              </div>

              {/* ✅ 가격 스펙 반영 */}
              <div className="mt-1 flex items-end gap-1">
                {/* 숫자: 1rem / 600 / 1.4rem */}
                <span className="text-[#191A1C] font-pretendard text-[1rem] font-semibold leading-[1.4rem]">
                  {it.price.toLocaleString()}
                </span>
                {/* '원': 0.875rem / 400 / 1.4rem */}
                <span className="text-[#191A1C] font-pretendard text-[0.875rem] font-normal leading-[1.4rem]">
                  원
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ */
/*            SECTION WRAP        */
/* ------------------------------ */
const Section = ({ title, subtitle, children }) => (
  <section className="px-6">
    <h2 className={h2Class}>{title}</h2>
    {subtitle && <p className="mt-1 text-[12px] text-[#8B90A0]">{subtitle}</p>}
    <div className="mt-4">{children}</div>
  </section>
);

/* ------------------------------ */
/*            MAIN SWITCH         */
/* ------------------------------ */
export default function Checklist({
  step,
  purpose, setPurpose,
  budget, setBudget,
  who, setWho,
  items, toggleItem,
  specialMode, setSpecialMode,
  selectedPkgId, setSelectedPkgId,
  packageName, setPackageName,
}) {
  switch (step) {
    case 0:
      return (
        <Section title="파티의 목적이 무엇인가요?">
          <div className="flex flex-wrap gap-3">
            {PURPOSE_OPTIONS.map((opt) => (
              <Chip key={opt} active={purpose === opt} onClick={() => setPurpose(opt)}>{opt}</Chip>
            ))}
          </div>
        </Section>
      );

    case 1:
      return (
        <Section title="예산 범위를 선택해주세요">
          <div className="flex flex-wrap gap-3">
            {BUDGET_OPTIONS.map((opt) => (
              <Chip key={opt} active={budget === opt} onClick={() => setBudget(opt)}>{opt}</Chip>
            ))}
          </div>
        </Section>
      );

    case 2:
      return (
        <Section title="누구와 함께할 파티인가요?">
          <div className="flex flex-wrap gap-3">
            {WHO_OPTIONS.map((opt) => (
              <Chip key={opt} active={who === opt} onClick={() => setWho(opt)}>{opt}</Chip>
            ))}
          </div>
        </Section>
      );

    case 3:
      return (
        <Section title="구매 항목을 선택해주세요" subtitle="(1개 이상 선택 가능)">
          <div className="space-y-6">
            {BUY_GROUPS.map((g) => (
              <div key={g.title}>
                <div className="mb-2 font-pretendard text-[0.875rem] font-semibold text-[#353A40]">
                  {g.title}
                </div>
                <ChipCheckGroup options={g.items} selected={items} onToggle={toggleItem} />
              </div>
            ))}
          </div>
        </Section>
      );

    case 4:
      return (
        <Section title="특별히 준비해드릴 게 있을까요?" subtitle="(파티 콘셉트, 테마, 색감 등)">
          <div className="flex flex-col gap-3 items-start">
            <Chip active={specialMode === "없음"} onClick={() => setSpecialMode("없음")}>없음</Chip>
            <div>
              <Chip active={specialMode === "직접입력"} onClick={() => setSpecialMode("직접입력")}>직접입력</Chip>
              {specialMode === "직접입력" && (
                <p className="mt-2 text-[13px] text-[#7F6BFF]">*준비 중인 기능입니다</p>
              )}
            </div>
          </div>
        </Section>
      );

    case 5:
      return (
        <Section title={<>토리님을 위한<br />맞춤 패키지를 준비했어요.</>}>
          <div className="space-y-3">
            {PACKAGES.map((pkg) => (
              <PackageCard
                key={pkg.id}
                data={pkg}
                selected={selectedPkgId === pkg.id}
                onSelect={() => setSelectedPkgId(pkg.id)}
              />
            ))}
          </div>
        </Section>
      );

    case 6:
      return (
        <Section title="패키지 명을 입력해주세요">
          <div className="mt-2">
            <div className="relative">
              <input
                value={packageName}
                onChange={(e) => setPackageName(e.target.value.slice(0, 60))}
                placeholder="패키지 명"
                className="w-full border-b-2 border-[#BBAFFB] focus:border-[#7F6BFF] outline-none py-2 text-[16px] bg-transparent"
              />
              {packageName && (
                <button
                  type="button"
                  onClick={() => setPackageName("")}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[#B7BAC0]"
                  aria-label="clear"
                >
                  ×
                </button>
              )}
            </div>
            <div className="mt-1 text-[12px] text-[#8B8F95]">{packageName.length}/60</div>
          </div>
        </Section>
      );

    default:
      return null;
  }
}