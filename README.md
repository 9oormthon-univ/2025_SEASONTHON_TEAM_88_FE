# 🎁 이벤토리 (Eventory)

> 스트레스 없이, 한곳에서 계획하는 나만의 이벤트

[2025 kakao X goorm 시즌톤] 88팀 프론트엔드 레포지토리입니다.

<br>

## 주요 기능

| 기능 | 설명 |
|---|---|
| **파티 만들기** | 이벤트(파티)를 생성하고 정보를 관리 |
| **설문 기반 맞춤 패키지** | 설문에 답하면 이벤트에 맞는 준비 패키지를 추천 |
| **내 파티** | 참여 중인 파티 목록과 추천 세트 확인 |
| **준비 리스트** | 파티별 준비물 체크리스트 관리 |
| **주변 찾기 · 필터** | 조건에 맞는 항목 탐색 |

<br>

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Core | React 19, JavaScript, Vite 7 |
| 스타일링 | Tailwind CSS 4, tailwind-scrollbar-hide |
| 상태 관리 | Zustand, TanStack Query v5 |
| 폼 · 검증 | React Hook Form, Zod, @hookform/resolvers |
| 애니메이션 | Framer Motion |
| 네트워크 | Axios |
| 아이콘 | react-icons, vite-plugin-svgr |

<br>

## 시작하기

```bash
yarn install
yarn dev
```

| 명령 | 설명 |
|---|---|
| `yarn dev` | 개발 서버 실행 (`--host`, 모바일 기기 접속 가능) |
| `yarn build` | 프로덕션 빌드 |
| `yarn preview` | 빌드 결과 미리보기 |
| `yarn lint` | ESLint 검사 |

<br>

## 프로젝트 구조

```
src/
├── apis/          partyApi · surveyApi · todoApi
├── components/
│   ├── domain/    도메인 컴포넌트
│   └── ui/        공용 UI 컴포넌트
├── layout/        MainLayout · Header · BottomNav · MobileScreen
├── pages/         화면 단위 페이지
├── hooks/         api 훅
└── assets/        css · icons · images
```

모바일 우선(`MobileScreen`) 레이아웃으로 설계되었습니다.

<br>

## 팀

| GitHub |
|---|
| [@seongwwww](https://github.com/seongwwww) |
| [@JEONJOOEUN04](https://github.com/JEONJOOEUN04) |
