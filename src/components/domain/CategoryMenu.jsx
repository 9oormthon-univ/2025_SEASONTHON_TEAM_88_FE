import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CategoryIcon from '../ui/CategoryIcon';
import { CATEGORIES } from '../../mocks/products';
const TABS = ['식품', '소품', '주얼리', '문구'];

const CategoryMenu = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [direction, setDirection] = useState(1); // 1: 오른쪽 이동, -1: 왼쪽 이동

  const handleTabClick = (tab) => {
    const currentIndex = TABS.indexOf(activeTab);
    const newIndex = TABS.indexOf(tab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(tab);
  };

  return (
    <section className="p-4 bg-white">
      {/* 탭 네비게이션 */}
      <nav className="flex items-center justify-between w-full border-b font-sans border-[#81878B]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 text-lg transition-colors duration-200 ${
              activeTab === tab ? 'font-bold border-b-2 border-black text-black' : 'text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* 카테고리 아이콘 그리드 */}
      <div className="relative h-40 mt-4 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            initial={{ x: direction === 1 ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 1 ? '-100%' : '100%', opacity: 0 }}
            transition={{ duration: 0.05 }}
            className="absolute grid w-full grid-cols-5 gap-x-2 gap-y-4"
          >
            {CATEGORIES[activeTab]?.map((category) => (
              <div key={category.name} className="flex flex-col items-center text-center">
                <CategoryIcon name={category.icon} />
                <p className="font-sans text-xs text-gray-700">{category.name}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CategoryMenu;
