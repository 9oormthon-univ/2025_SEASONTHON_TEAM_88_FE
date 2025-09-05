import React, { useState } from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export default function PartySelectSheet({ parties = [], onSelectParty }) {
  const [selectedPartyId, setSelectedPartyId] = useState(null);

  // Mock data for demonstration if parties array is empty
  const partyList =
    parties.length > 0
      ? parties
      : [
          { id: 'party1', name: '알파 팀' },
          { id: 'party2', name: '브라보 팀' },
          { id: 'party3', name: '찰리 팀' },
        ];

  return (
    <div className="p-6 pt-0">
      <h2 className="mb-6 font-semibold text-center text-[#191A1C] font-pretendard">파티 선택하기</h2>
      <div className="mb-6 space-y-3">
        {partyList.map((party) => (
          <label
            key={party.id}
            className={`flex items-center justify-between w-full h-[2.625rem] bg-[#F8F8F8] text-[0.875rem] font-medium font-pretendard px-4 border text-[#191A1C] rounded-lg cursor-pointer transition-all ${
              selectedPartyId === party.id ? 'border-[#8371FD] ring-2 ring-[#8371FD]' : 'border-gray-300'
            }`}
          >
            <span>{party.name}</span>

            {/* Conditionally render the check icon */}
            {selectedPartyId === party.id ? <Icon name="filled-check" /> : <Icon name="blank-check" />}

            {/* Hidden radio input to handle state and accessibility */}
            <input
              type="radio"
              name="party-select"
              value={party.id}
              checked={selectedPartyId === party.id}
              onChange={() => setSelectedPartyId(party.id)}
              className="hidden"
            />
          </label>
        ))}
      </div>
      <Button
        className="font-pretendard text-[0.875rem] font-medium mt-[1.63rem]"
        variant="cta"
        onClick={() => onSelectParty(selectedPartyId)}
        isActive={!!selectedPartyId}
      >
        확인
      </Button>
    </div>
  );
}
