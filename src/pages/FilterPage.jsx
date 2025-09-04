import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Header from '../layout/Header';
import Icon from '../components/ui/Icon';

// 각 필터 섹션을 위한 재사용 컴포넌트
const FilterSection = ({ title, options, multiSelect = true }) => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (option) => {
    setSelected((prev) => {
      if (multiSelect) {
        return prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option];
      }
      return [option]; // 단일 선택
    });
  };

  return (
    <section className="py-4 border-b">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`px-4 py-2 text-sm border rounded-full transition-colors ${
              selected.includes(option) ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
};

const FilterPage = () => {
  const navigate = useNavigate();

  const pageHeader = (
    <Header
      left={
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate(-1)}>
            <Icon name="arrow-left" />
          </button>
          <h1 className="text-lg font-bold">필터</h1>
        </div>
      }
    />
  );

  // TODO: 필터 데이터는 외부에서 관리하는 것이 좋습니다.
  const filterData = {
    situation: ['생일', '기념일', '프로포즈', '파티/모임', '돌잔치'],
    discount: ['전체', '50% 이상', '30% 이상', '20% 이상', '10% 이상'],
    price: ['1만원 이하', '1만원 ~ 2만원', '2만원 ~ 3만원', '3만원 ~ 4만원'],
    delivery: ['당일배송', '예약배송', '매장픽업', '전국배송 가능'],
  };

  return (
    <MainLayout header={pageHeader} showBottomNav={false}>
      <div className="p-4">
        <FilterSection title="상황별" options={filterData.situation} />
        <FilterSection title="할인율" options={filterData.discount} multiSelect={false} />
        <FilterSection title="가격대" options={filterData.price} multiSelect={false} />
        <FilterSection title="배송/수령 방법" options={filterData.delivery} />
      </div>
      <div className="sticky bottom-0 p-4 bg-white border-t">
        <button className="w-full h-12 text-white bg-black rounded-lg">적용하기</button>
      </div>
    </MainLayout>
  );
};

export default FilterPage;
