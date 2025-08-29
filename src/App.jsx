import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import Test from './pages/Test';
import PartyPage from './pages/PartyPage';
import AroundPage from './pages/AroundPage';
import WishlistPage from './pages/WishlistPage';
import MyPage from './pages/MyPage';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/around" element={<AroundPage />} />
          <Route path="/party" element={<PartyPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
