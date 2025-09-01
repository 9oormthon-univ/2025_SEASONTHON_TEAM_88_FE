import React, { useState } from 'react';

import CategoryIcon from '../ui/CategoryIcon';

// 데이터는 그대로 유지됩니다.
const TABS = ['식품', '소품', '주얼리', '문구'];
const CATEGORIES = {
  식품: [
    { name: '케이크', icon: 'cakeIcon' },
    { name: '쿠키', icon: 'cookieIcon' },
    { name: '음료', icon: 'drinkIcon' },
    { name: '베이커리', icon: 'bakeryIcon' },
    { name: '떡', icon: 'riceCakeIcon' },
    { name: '전통간식', icon: 'traditionalSnackIcon' },
    { name: '초콜릿', icon: 'chocolateIcon' },
    { name: '사탕', icon: 'candyIcon' },
    { name: '건강식품', icon: 'healthFoodIcon' },
    { name: '선물세트', icon: 'giftSetIcon' },
  ],
  소품: [
    { name: '인형', icon: 'dollIcon' },
    { name: '디퓨저', icon: 'diffuserIcon' },
  ],
};

const CategoryMenu = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section className="p-4 bg-white">
      {/* 탭 네비게이션 */}
      <nav className="flex items-center border-b">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-lg transition-colors duration-200 ${
              activeTab === tab ? 'font-bold border-b-2 border-black text-black' : 'text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* 카테고리 아이콘 그리드 */}
      <div className="grid grid-cols-5 mt-4 gap-x-2 gap-y-4">
        {CATEGORIES[activeTab]?.map((category) => (
          <div key={category.name} className="flex flex-col items-center text-center">
            <CategoryIcon name={category.icon} />
            <p className="text-xs text-gray-700">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryMenu;
