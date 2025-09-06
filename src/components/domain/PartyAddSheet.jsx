import React, { useState } from 'react';
import Button from '../ui/Button';

export default function PartyAddSheet({ onAddParty }) {
  const [partyName, setPartyName] = useState('');

  const handleAdd = () => {
    if (partyName.trim()) {
      onAddParty(partyName);
    }
  };

  return (
    <div className="p-6 pt-0">
      <h2 className="mb-6 font-semibold text-center text-[#191A1C] font-pretendard">파티 추가</h2>
      <input
        type="text"
        value={partyName}
        onChange={(e) => setPartyName(e.target.value)}
        placeholder="파티명을 입력해주세요"
        className="w-full h-[2.625rem] px-4 border bg-[#F6F6F6] border-[#C2C2C2] text-[0.875rem] font-pretendard rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <Button
        variant="cta"
        onClick={handleAdd}
        isActive={!!partyName.trim()}
        className="font-pretendard text-[0.875rem] font-medium mt-[0.87rem]"
      >
        확인
      </Button>
    </div>
  );
}
