// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HomePage from './pages/HomePage';
import Test from './pages/Test';
import PartyPage from './pages/PartyPage';
import AroundPage from './pages/AroundPage';
import WishlistPage from './pages/WishlistPage';
import MyPage from './pages/MyPage';

import Splash from './pages/intro/Splash';
import Login from './pages/intro/Login';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 인트로 */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />

          {/* 메인 라우팅 */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/around" element={<AroundPage />} />
          <Route path="/party" element={<PartyPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/test" element={<Test />} />

          {/* 없는 경로는 스플래쉬로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;  