// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';

const queryClient = new QueryClient();

// 초기 진입 페이지
import Splash from './pages/intro/Splash';
import Login from './pages/intro/Login';

// lazy 로드 페이지들
const LoginPhone   = lazy(() => import('./pages/intro/LoginPhone'));
const SignupEmail  = lazy(() => import('./pages/intro/SignupEmail'));
const HomePage     = lazy(() => import('./pages/HomePage'));
const AroundPage   = lazy(() => import('./pages/AroundPage'));
const PartyPage    = lazy(() => import('./pages/PartyPage'));
const PartyStart   = lazy(() => import('./pages/Party/PartyStart'));  
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const MyPage       = lazy(() => import('./pages/MyPage'));
const Test         = lazy(() => import('./pages/Test'));

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Routes>
            {/* 인트로 */}
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/phone" element={<LoginPhone />} />
            <Route path="/signup/email" element={<SignupEmail />} />

            {/* 메인 */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/around" element={<AroundPage />} />
            <Route path="/party" element={<PartyPage />} />
            <Route path="/party/start" element={<PartyStart />} /> 
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/test" element={<Test />} />

            {/* 와일드카드 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}