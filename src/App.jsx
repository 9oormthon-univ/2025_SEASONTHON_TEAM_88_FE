// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Splash from './pages/intro/Splash';
import Login from './pages/intro/Login';
import SignupForm from './pages/intro/SignupForm.jsx';
import SignupSuccess from './pages/intro/SignupSuccess.jsx';

import HomePage from './pages/HomePage';
import AroundPage from './pages/AroundPage';
import PartyPage from './pages/PartyPage';
import WishlistPage from './pages/WishlistPage';
import MyPage from './pages/MyPage';
import Test from './pages/Test';

// 파티 시작 화면이 존재한다면 주석 해제
import PartyStart from './pages/Party/PartyStart';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 인트로 */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signupform" element={<SignupForm />} />
          <Route path="/signupsuccess" element={<SignupSuccess />} />

          {/* 메인 */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/around" element={<AroundPage />} />
          <Route path="/party" element={<PartyPage />} />
          <Route path="/party/start" element={<PartyStart />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/test" element={<Test />} />

          {/* 없는 경로 → 스플래시 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}