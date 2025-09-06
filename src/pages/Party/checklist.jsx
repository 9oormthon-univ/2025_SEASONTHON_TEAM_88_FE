// src/pages/Party/checklist.jsx
import React, { useState } from 'react';

/* ✅ 도메인 컴포넌트 */
import PackageCard from '../../components/domain/PackageCard';

/* ------------------------------ */
/* DATA SET (실사용 옵션들) */
/* ------------------------------ */
export const PURPOSE_OPTIONS = [
  '생일',
  '기념일',
  '프로포즈',
  '홈파티',
  '졸업/입학',
  '돌잔치',
  '브라이덜샤워',
  '젠더리빌',
  '기타',
];

export const BUDGET_OPTIONS = [
  '1만원미만',
  '1~2만원대',
  '3~4만원대',
  '5~6만원대',
  '7~8만원대',
  '9~10만원대',
  '10만원 이상',
  '기타',
];

export const WHO_OPTIONS = ['나를 위해', '연인', '가족', '친구', '동료/지인', '기타'];

const BUY_GROUPS = [
  { title: '식품', items: ['케이크', '쿠키', '음료', '베이커리', '떡', '전통간식', '초콜릿', '사탕', '건강식품'] },
  { title: '소품', items: ['풍선', '가랜드', '현수막', '캔들', '꽃/화분', '테이블웨어', '조명', '장식', '키트'] },
  { title: '주얼리', items: ['반지', '팔찌', '귀걸이', '목걸이', '발찌', '헤어 악세사리', '커플세트', '시계'] },
  { title: '문구', items: ['카드', '편지지', '포장', '휴대폰 케이스', '그립톡', '스티커', '키링'] },
];

/* ------------------------------ */
/* UI PRIMITIVES */
/* ------------------------------ */
const h2Class = 'font-pretendard text-[1.25rem] font-[600] leading-[1.75rem] text-[#191A1C]';

function Chip({ active, children, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center',
        'px-[1.25rem] py-[0.5625rem] rounded-[1.25rem]',
        active ? 'bg-[#7F6BFF] text-white' : 'bg-[#F5F5F5] text-[#646B72] hover:bg-[#EFEFEF]',
        'transition-colors',
        className,
      ].join(' ')}
    >
      <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem]">{children}</span>
    </button>
  );
}

function CheckChip({ checked, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center',
        'px-[12px] py-[5px] rounded-[100px] border',
        checked ? 'bg-[#7F6BFF] text-white border-[#7F6BFF]' : 'bg-white text-[#81878B] border-[#B1B7BC]',
        'transition-colors',
      ].join(' ')}
    >
      <span className="font-pretendard text-[12px] font-medium leading-[19px]">{children}</span>
    </button>
  );
}

function ChipCheckGroup({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <CheckChip key={opt} checked={selected.includes(opt)} onClick={() => onToggle(opt)}>
          {opt}
        </CheckChip>
      ))}
    </div>
  );
}

/* ------------------------------ */
/* SECTION WRAP */
/* ------------------------------ */
const Section = ({ title, subtitle, children }) => (
  <section className="px-6">
    <h2 className={h2Class}>{title}</h2>
    {subtitle && <p className="mt-1 text-[12px] text-[#8B90A0]">{subtitle}</p>}
    <div className="mt-4">{children}</div>
  </section>
);

/* ------------------------------ */
/* MAIN SWITCH (콘텐츠만 렌더) */
/* ------------------------------ */
/** ⛔️ 진행바/퍼센트/버튼은 PartyStart.jsx에서만 관리 */
export default function Checklist({
  step,
  // step 0~3
  purpose,
  setPurpose,
  budget,
  setBudget,
  who,
  setWho,
  items,
  toggleItem,
  // step 4
  specialMode,
  setSpecialMode,
  specialText: specialTextProp,
  setSpecialText: setSpecialTextProp,
  // step 5
  selectedPkgId,
  setSelectedPkgId,
  // step 6
  packageName,
  setPackageName,
  packages = [], // ✅ 더미 제거: 기본값 빈 배열
}) {
  // 직접입력 내부 기본값 보정(상위에서 안 내려줬을 때)
  const [internalSpecialText, setInternalSpecialText] = useState('');
  const specialText = specialTextProp ?? internalSpecialText;
  const setSpecialText = setSpecialTextProp ?? setInternalSpecialText;

  switch (step) {
    case 0:
      return (
        <Section title="파티의 목적이 무엇인가요?">
          <div className="flex flex-wrap gap-3">
            {PURPOSE_OPTIONS.map((opt) => (
              <Chip key={opt} active={purpose === opt} onClick={() => setPurpose(opt)}>
                {opt}
              </Chip>
            ))}
          </div>
        </Section>
      );

    case 1:
      return (
        <Section title="예산 범위를 선택해주세요">
          <div className="flex flex-wrap gap-3">
            {BUDGET_OPTIONS.map((opt) => (
              <Chip key={opt} active={budget === opt} onClick={() => setBudget(opt)}>
                {opt}
              </Chip>
            ))}
          </div>
        </Section>
      );

    case 2:
      return (
        <Section title="누구와 함께할 파티인가요?">
          <div className="flex flex-wrap gap-3">
            {WHO_OPTIONS.map((opt) => (
              <Chip key={opt} active={who === opt} onClick={() => setWho(opt)}>
                {opt}
              </Chip>
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
                <div className="mb-2 font-pretendard text-[0.875rem] font-[600] text-[#353A40]">{g.title}</div>
                <ChipCheckGroup options={g.items} selected={items} onToggle={toggleItem} />
              </div>
            ))}
          </div>
        </Section>
      );

    case 4:
      return (
        <Section title="특별히 준비해드릴 게 있을까요?" subtitle="(파티 콘셉트, 테마, 색감 등)">
          <div className="flex flex-col items-start gap-3">
            <Chip active={specialMode === '없음'} onClick={() => setSpecialMode('없음')}>
              없음
            </Chip>

            <div className="w-full">
              {specialMode !== '직접입력' ? (
                <Chip active={false} onClick={() => setSpecialMode('직접입력')}>
                  직접입력
                </Chip>
              ) : (
                <div className="mt-3 w-[19.875rem] rounded-[1.3125rem] bg-[#8371FD] px-5 pt-4 pb-5 flex flex-col">
                  <p className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem] text-white">직접입력</p>
                  <div className="flex justify-center mt-1">
                    <textarea
                      value={specialText}
                      onChange={(e) => setSpecialText(e.target.value)}
                      placeholder="입력하기"
                      className="w-[17.625rem] h-[6.9375rem] rounded-[0.75rem] bg-white p-3 px-4 resize-none outline-none
                                 font-pretendard text-[0.75rem] font-medium leading-[1.2rem]
                                 placeholder:text-[#B1B7BC] text-[#464B51]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>
      );

    case 5:
      return (
        <Section
          title={
            <>
              토리님을 위한
              <br />
              맞춤 패키지를 준비했어요.
            </>
          }
        >
          <div className="space-y-3">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                variant="selectable"
                data={pkg}
                selected={selectedPkgId === pkg.id}
                onSelect={() => setSelectedPkgId(pkg.id)}
              />
            ))}
            {packages.length === 0 && (
              <p className="text-sm text-[#8B90A0]">추천 패키지를 불러오는 중이거나 아직 없습니다.</p>
            )}
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
                  onClick={() => setPackageName('')}
                  className="absolute flex items-center justify-center -translate-y-1/2 right-1 top-1/2"
                  aria-label="clear"
                >
                  <div className="flex items-center justify-center w-[1.1875rem] h-[1.1875rem] rounded-full bg-[#D9D9D9]">
                    <svg width="0.6875rem" height="0.6875rem" viewBox="0 0 24 24" fill="none">
                      <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
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
