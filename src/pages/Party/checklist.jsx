import PackageCard from '../../components/domain/PackageCard';

const PURPOSE_OPTIONS = [
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
const BUDGET_OPTIONS = [
  '1만원미만',
  '1~2만원대',
  '3~4만원대',
  '5~6만원대',
  '7~8만원대',
  '9~10만원대',
  '10만원 이상',
  '기타',
];
const WHO_OPTIONS = ['나를 위해', '연인', '가족', '친구', '동료/지인', '기타'];
const BUY_GROUPS = [
  { title: '식품', items: ['케이크', '쿠키', '음료', '베이커리', '떡', '전통간식', '초콜릿', '사탕', '건강식품'] },
  { title: '소품', items: ['풍선', '가랜드', '현수막', '캔들', '꽃/화분', '테이블웨어', '조명', '장식', '키트'] },
  { title: '주얼리', items: ['반지', '팔찌', '귀걸이', '목걸이', '발찌', '헤어 악세사리', '커플세트', '시계'] },
  { title: '문구', items: ['카드', '편지지', '포장', '휴대폰 케이스', '그립톡', '스티커', '키링'] },
];
function Checklist({
  step,
  purpose,
  setPurpose,
  budget,
  setBudget,
  who,
  setWho,
  items,
  toggleItem,
  specialMode,
  setSpecialMode,
  specialText,
  setSpecialText,
  selectedPkgId,
  setSelectedPkgId,
  packageName,
  setPackageName,
  packages = [],
}) {
  const h2Class = 'font-pretendard text-[1.25rem] font-bold leading-tight text-[#191A1C]';

  const Chip = ({ active, children, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full transition-colors ${
        active ? 'bg-[#7F6BFF] text-white' : 'bg-[#F5F5F5] text-[#646B72] hover:bg-[#EFEFEF]'
      }`}
    >
      <span className="text-sm font-medium font-pretendard">{children}</span>
    </button>
  );

  const CheckChip = ({ checked, children, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full border transition-colors ${
        checked ? 'bg-[#7F6BFF] text-white border-[#7F6BFF]' : 'bg-white text-[#81878B] border-[#B1B7BC]'
      }`}
    >
      <span className="text-xs font-medium font-pretendard">{children}</span>
    </button>
  );

  const ChipCheckGroup = ({ options, selected, onToggle }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <CheckChip key={opt} checked={selected.includes(opt)} onClick={() => onToggle(opt)}>
          {opt}
        </CheckChip>
      ))}
    </div>
  );

  const Section = ({ title, subtitle, children }) => (
    <section className="px-6">
      <h2 className={h2Class}>{title}</h2>
      {subtitle && <p className="mt-1 text-xs text-[#8B90A0]">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );

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
                <div className="mb-2 text-sm font-semibold text-[#353A40]">{g.title}</div>
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
            {specialMode !== '직접입력' ? (
              <Chip active={false} onClick={() => setSpecialMode('직접입력')}>
                직접입력
              </Chip>
            ) : (
              <div className="w-full max-w-sm mt-3 rounded-2xl bg-[#8371FD] p-5">
                <p className="text-sm font-medium text-white">직접입력</p>
                <div className="mt-2">
                  <textarea
                    value={specialText}
                    onChange={(e) => setSpecialText(e.target.value)}
                    placeholder="입력하기"
                    className="w-full h-28 p-3 text-xs rounded-lg resize-none outline-none placeholder:text-[#B1B7BC] text-[#464B51]"
                  />
                </div>
              </div>
            )}
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
                className="w-full py-2 bg-transparent border-b-2 border-[#BBAFFB] focus:border-[#7F6BFF] outline-none"
              />
              {packageName && (
                <button
                  type="button"
                  onClick={() => setPackageName('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2"
                  aria-label="clear"
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D9D9D9]">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
            <div className="mt-1 text-xs text-right text-[#8B8F95]">{packageName.length}/60</div>
          </div>
        </Section>
      );
    default:
      return null;
  }
}

export default Checklist;
