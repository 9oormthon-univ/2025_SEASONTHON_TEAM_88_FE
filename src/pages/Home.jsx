// src/app/page.js (또는 src/pages/index.js)

import React from 'react';

const Home = () => {
  return (
    // 전체를 감싸는 div에 패딩을 추가해 콘텐츠를 중앙에 배치
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">안녕하세요!</h1>

      <p className="font-sans text-lg mb-2">이 텍스트는 기본 Pretendard 폰트(Regular)로 표시됩니다.</p>

      <p className="font-sans font-light text-lg mb-2">
        이것은 <span className="font-bold">font-light</span>를 적용한 가벼운 텍스트이며, 이 부분은{' '}
        <span className="font-black">font-black</span>으로 가장 두껍습니다.
      </p>

      <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
        버튼 (Pretendard-SemiBold)
      </button>
    </div>
  );
};

export default Home;
