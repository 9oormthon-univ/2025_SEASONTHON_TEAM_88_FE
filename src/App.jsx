// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Splash from './pages/intro/Splash';
import Login from './pages/intro/Login';
import ProductListPage from './pages/products/ProductListPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import FilterPage from './pages/FilterPage';
import SignupForm from './pages/intro/SignupForm.jsx';
import SignupSuccess from './pages/intro/SignupSuccess.jsx';
import HomePage from './pages/HomePage';
import AroundPage from './pages/AroundPage';
import PartyPage from './pages/PartyPage';
import PartyStart from './pages/Party/PartyStart';
import WishlistPage from './pages/WishlistPage';
import MyPage from './pages/MyPage';
import Test from './pages/Test';
import Redirection from './pages/intro/Redirection.jsx';
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
          <Route path="/products/:parentCategory/:subCategory" element={<ProductListPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/auth/kakao/callback" element={<Redirection />}></Route>
          {/* 없는 경로는 스플래쉬로 리다이렉트 */}

          {/* 없는 경로 → 스플래시 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
