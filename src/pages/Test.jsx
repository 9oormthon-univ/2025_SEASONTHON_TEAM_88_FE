import ProductCard from '../components/domain/ProductCard';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Select from '../components/ui/Select';
import Tag from '../components/ui/Tag';
import React, { useState } from 'react';
import Header from '../layout/Header';
import MainLayout from '../layout/MainLayout';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
/**
 * Select 컴포넌트의 사용법을 보여주기 위한 테스트 페이지입니다.
 */
const Test = () => {
  // Select 컴포넌트에서 선택된 값을 저장하기 위한 state를 생성합니다.
  // 초기값은 빈 문자열('')로 설정하여 플레이스홀더가 보이도록 합니다.
  const [selectedValue, setSelectedValue] = useState('');
  const [isInParty, setIsInParty] = useState(true);
  // Select 컴포넌트에 전달할 옵션 목록을 배열로 정의합니다.
  // 각 옵션은 고유한 'value'와 사용자에게 보여질 'label'을 가집니다.
  const fruitOptions = [
    { value: 'apple', label: '사과' },
    { value: 'banana', label: '바나나' },
    { value: 'grape', label: '포도' },
    { value: 'orange', label: '오렌지' },
  ];

  // Select 박스에서 새로운 옵션을 선택했을 때 호출될 함수입니다.
  // event 객체에서 선택된 값(event.target.value)을 가져와 state를 업데이트합니다.
  const handleSelectChange = (event) => {
    console.log('선택된 값:', event.target.value);
    setSelectedValue(event.target.value);
  };

  // 페이지 헤더를 정의합니다.
  const testHeader = (
    <Header
      className="text-white bg-black"
      left={
        <div className="flex items-center">
          <Icon name="arrow-left" size={1.5} />
          <h1 className="text-xl font-bold">식품</h1>
        </div>
      }
      right={
        <div className="flex items-center space-x-4">
          <button aria-label="검색">
            <Icon name="search" size={1.5} />
          </button>
          <button aria-label="알림">
            <Icon name="bell" size={1.5} />
          </button>
          <button aria-label="장바구니">
            <Icon name="cart" size={1.5} />
          </button>
        </div>
      }
    />
  );

  return (
    <MainLayout header={testHeader} showBottomNav={false}>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Select 컴포넌트 테스트</h1>

        {/* === Select 컴포넌트 사용 부분 === */}
        <Select
          label="좋아하는 과일을 선택하세요" // 컴포넌트 위에 표시될 라벨
          options={fruitOptions} // 선택 가능한 옵션 목록
          value={selectedValue} // 현재 선택된 값 (state와 연결)
          onChange={handleSelectChange} // 값이 변경될 때 호출될 함수
          placeholder="-- 과일 선택 --" // 초기 플레이스홀더 텍스트
        />
        {/* ============================== */}

        {/* 현재 선택된 값을 화면에 표시하여 state가 잘 변경되는지 확인합니다. */}
        <div className="p-4 mt-4 bg-gray-800 rounded-md">
          <p className="text-sm text-gray-400">현재 선택된 값:</p>
          <p className="text-lg font-bold text-purple-400">{selectedValue || '아직 선택되지 않았습니다.'}</p>
        </div>
      </div>
      <Button variant="primary" isActive={isInParty} onClick={() => setIsInParty(!isInParty)}>
        {isInParty ? '파티에서 빼기' : '내 파티에 담기'}
      </Button>
      <Button variant="icon" onClick={() => alert('파티 시작!')}>
        <div className="flex items-center gap-2">
          <Icon name="party" size={1.25} />
          <span>내 파티 시작하기</span>
        </div>
        <Icon name="arrow-left" size={1.25} />
      </Button>
      // 비활성화된 상태
      <Button variant="icon" disabled={false}>
        <span>조건을 만족해야 시작할 수 있어요</span>
      </Button>
    </MainLayout>
  );
};

export default Test;
