// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Splash from './pages/intro/Splash';
import Login from './pages/intro/Login';
<<<<<<< HEAD
import Signup from './pages/intro/Signup';
=======
import LoginPhone from './pages/intro/LoginPhone';
import SignupEmail from './pages/intro/SignupEmail';

import HomePage from './pages/HomePage';
import AroundPage from './pages/AroundPage';
import PartyPage from './pages/PartyPage';
import WishlistPage from './pages/WishlistPage';
import MyPage from './pages/MyPage';
import Test from './pages/Test';

// (선택) 파티 시작 페이지까지 라우팅하려면 아래 라인 주석 해제
// import PartyStart from './pages/Party/PartyStart';
>>>>>>> 078329a (✨[Feat] 내파티 설문조사 기능 구현 (#16))

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 인트로 */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
<<<<<<< HEAD
          <Route path="/signup" element={<Signup />} />
          {/* 메인 라우팅 */}
=======
          <Route path="/login/phone" element={<LoginPhone />} />
          <Route path="/signup/email" element={<SignupEmail />} />

          {/* 메인 */}
>>>>>>> 078329a (✨[Feat] 내파티 설문조사 기능 구현 (#16))
          <Route path="/home" element={<HomePage />} />
          <Route path="/around" element={<AroundPage />} />
          <Route path="/party" element={<PartyPage />} />
          {/* <Route path="/party/start" element={<PartyStart />} /> */}
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/test" element={<Test />} />
<<<<<<< HEAD
          {/* 없는 경로는 스플래쉬로 리다이렉트 */}
=======

          {/* 없는 경로 → 스플래쉬 */}
>>>>>>> 078329a (✨[Feat] 내파티 설문조사 기능 구현 (#16))
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
<<<<<<< HEAD
}

export default App;
=======
}
>>>>>>> 078329a (✨[Feat] 내파티 설문조사 기능 구현 (#16))
