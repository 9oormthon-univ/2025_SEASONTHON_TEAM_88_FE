import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../layout/MainLayout';
import Header from '../../layout/Header';
import { CATEGORIES } from '../../mocks/products';
import Adver2 from '../../assets/images/adver2.svg';
import Icon from '../../components/ui/Icon';
import SortDropdown from '../../components/domain/SortDropdown';
const ProductListPage = () => {
  const currentPage = 1;
  const totalPage = 2;
  const navigate = useNavigate();
  const { parentCategory, subCategory } = useParams();
  const [activeSubCategory, setActiveSubCategory] = useState(subCategory);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  // 필터 정렬 상태
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('인기순');

  const subCategoryList = CATEGORIES[parentCategory] || [];

  const getVisibleCategories = () => {
    // ... (이전과 동일한 로직, 수정 없음)
    const totalCount = subCategoryList.length;
    if (totalCount <= 5) {
      return subCategoryList;
    }
    const activeIndex = subCategoryList.findIndex((item) => item.name === activeSubCategory);
    if (activeIndex === -1) {
      return subCategoryList.slice(0, 5);
    }
    let startIndex = activeIndex - 2;
    let endIndex = startIndex + 5;
    if (startIndex < 0) {
      startIndex = 0;
      endIndex = 5;
    }
    if (endIndex > totalCount) {
      endIndex = totalCount;
      startIndex = totalCount - 5;
    }
    return subCategoryList.slice(startIndex, endIndex);
  };

  const visibleCategories = getVisibleCategories();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setActiveSubCategory(subCategory);
  }, [subCategory]);

  const pageHeader = (
    <Header
      left={
        <div className="flex items-center space-x-1">
          <button onClick={() => navigate(-1)}>
            <Icon name="arrow-left" />
          </button>
          <h1 className="text-lg font-bold">{parentCategory}</h1>
        </div>
      }
      right={
        <div className="flex items-center space-x-3">
          <button aria-label="검색">
            <Icon name="search" />
          </button>
          <Link to="/" aria-label="홈">
            <Icon name="home" />
          </Link>
          <button aria-label="장바구니">
            <Icon name="cart" />
          </button>
        </div>
      }
    />
  );

  return (
    <MainLayout header={pageHeader} showBottomNav={false}>
      <nav className="relative p-4 border-b" ref={dropdownRef}>
        {/* ✨ isDropdownOpen 상태에 따라 다른 UI를 렌더링합니다. */}
        {isDropdownOpen ? (
          // --- 메뉴가 열렸을 때의 UI ---
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">{activeSubCategory}</span>
            <button onClick={() => setIsDropdownOpen(false)}>
              <Icon name="dropdown" size={1.5} className="rotate-180 " />
            </button>
          </div>
        ) : (
          // --- 메뉴가 닫혔을 때의 UI (기존과 동일) ---
          <div className="flex items-center justify-around">
            {visibleCategories.map((item) => (
              <Link
                key={item.name}
                to={`/products/${parentCategory}/${item.name}`}
                className={`w-16 py-1 text-center text-gray-400 font-semibold whitespace-nowrap ${
                  activeSubCategory === item.name ? 'font-semibold text-gray-900' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}

            {subCategoryList.length > 5 && (
              <button onClick={() => setIsDropdownOpen(true)}>
                <Icon name="dropdown" size={1.5} className="ml-2" />
              </button>
            )}
          </div>
        )}

        <AnimatePresence>
          {isDropdownOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsDropdownOpen(false)}
                className="absolute left-0 z-10 w-full h-screen top-full bg-black/50"
              />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="absolute left-0 z-20 w-full p-4 bg-white border-b shadow-lg top-full"
              >
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {subCategoryList.map((item) => (
                    <Link
                      key={item.name}
                      to={`/products/${parentCategory}/${item.name}`}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`text-gray-400 ${activeSubCategory === item.name ? 'font-bold text-gray-900' : ''}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* 페이지 컨텐츠 */}
      <div className="relative">
        <img src={Adver2} alt="케이크 레터링 광고" className="w-full" />
        <div className="absolute flex items-center justify-between w-full px-4 bottom-3">
          <button
            className="inline-flex items-center h-5 px-3 font-pretendard rounded-full text-[0.625rem] text-white/40 bg-black/40"
            aria-label="추천 상품 보기"
          >
            추천 상품 보기 <Icon name="arrow-right" color="text-white/40" size={0.5} />
          </button>
          <div className="inline-flex items-center justify-center h-5 px-2 text-[0.625rem] rounded-full bg-black/40">
            <span className={currentPage === 1 ? 'text-white' : 'text-white/40'}> {currentPage} </span>
            <span className="ml-1 text-white/40"> | {totalPage}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <button onClick={() => setIsSortOpen(true)} className="flex items-center space-x-1">
          <Icon name="sort" size={1.2} />
          <span className="text-sm">{sortOrder}</span>
        </button>
        <div className="flex items-center space-x-2">
          {/* TODO: 필터 아이콘으로 교체하고 Link로 감싸기 */}
          <button onClick={() => navigate('/filter')} className="px-3 py-1 text-sm border rounded-full">
            필터
          </button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="mb-4 text-2xl font-bold">{activeSubCategory} 상품 목록</h2>
        <p>이곳에 '{activeSubCategory}' 카테고리의 상품들이 표시됩니다.</p>
      </div>
      <SortDropdown
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        currentSort={sortOrder}
        onSortChange={(newSort) => setSortOrder(newSort)}
      />
    </MainLayout>
  );
};

export default ProductListPage;
