// src/pages/Test.jsx
import React, { useState } from 'react';

import Select from '../components/ui/Select';
import Header from '../layout/Header';
import MainLayout from '../layout/MainLayout';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import PartyCardClose from '../components/domain/PartyCardClose';
import ConfirmModal from '../components/ui/ConfirmModal'; // ✅ 삭제 확인 모달

const Test = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isInParty, setIsInParty] = useState(true);
  const [openDelete, setOpenDelete] = useState(false); // ✅ 모달 상태

  const fruitOptions = [
    { value: 'apple', label: '사과' },
    { value: 'banana', label: '바나나' },
    { value: 'grape', label: '포도' },
    { value: 'orange', label: '오렌지' },
  ];

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const testHeader = (
    <Header
      className="text-white bg-black"
      left={
        <div className="flex items-center gap-2">
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

  const sampleTasks = ['🥨 브리오슈 4입 구매하기', '🍾 프루티 스파클링 구매하기', '🎉 파스텔 홈파티 가랜드 구매하기'];

  return (
    <MainLayout header={testHeader} showBottomNav={false} className="bg-green-500">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Select 컴포넌트 테스트</h1>

        <Select
          label="좋아하는 과일을 선택하세요"
          options={fruitOptions}
          value={selectedValue}
          onChange={handleSelectChange}
          placeholder="-- 과일 선택 --"
        />

        <div className="p-4 mt-4 bg-gray-800 rounded-md">
          <p className="text-sm text-gray-400">현재 선택된 값:</p>
          <p className="text-lg font-bold text-purple-400">{selectedValue || '아직 선택되지 않았습니다.'}</p>
        </div>

        <PartyCardClose
          title="브라이덜 샤워"
          tasks={sampleTasks}
          progress={0.223}
          defaultOpen={false}
          onAdd={() => console.log('리스트 추가')}
          onDelete={() => console.log('파티 삭제')}
        />

        <div className="space-y-3">
          <Button variant="primary" isActive={isInParty} onClick={() => setIsInParty(!isInParty)}>
            {isInParty ? '파티에서 빼기' : '내 파티에 담기'}
          </Button>

          <Button variant="icon" onClick={() => alert('파티 시작!')}>
            <div className="flex items-center gap-2">
              <Icon name="party-nav" size={1.25} />
              <span>내 파티 시작하기</span>
            </div>
            <Icon name="arrow-right" size={1.25} />
          </Button>

          {/* 비활성화 버튼 예시 */}
          <Button variant="icon" disabled>
            <span>조건을 만족해야 시작할 수 있어요</span>
          </Button>
        </div>
      </div>

      {/* ✅ 파티 삭제 확인 모달 */}
      <ConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onCancel={() => setOpenDelete(false)}
        onConfirm={() => {
          // TODO: 실제 삭제 로직 연결
          console.log('파티 삭제 확정');
          setOpenDelete(false);
        }}
        title="파티를 삭제하시겠습니까?"
        description="삭제 후에는 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
      />
    </MainLayout>
  );
};

export default Test;
