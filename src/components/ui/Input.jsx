import React from 'react';
import Icon from './Icon'; // 검색 아이콘을 사용하기 위해 import

/**
 * 다양한 형태의 텍스트 입력을 받기 위한 공통 인풋(Input) 컴포넌트입니다.
 * @param {object} props
 * @param {'default' | 'search'} [props.variant='default'] - 인풋의 스타일 종류를 결정합니다.
 * @param {string} [props.label] - 인풋 필드 상단에 표시될 라벨 텍스트입니다.
 * @param {string} props.value - 인풋 필드의 현재 값입니다.
 * @param {function} props.onChange - 인풋 값 변경 시 실행될 함수입니다.
 * @param {string} [props.placeholder=''] - 값이 없을 때 표시될 안내 텍스트입니다.
 * @param {'text' | 'password' | 'email' | 'number'} [props.type='text'] - 인풋의 타입을 지정합니다.
 * @param {boolean} [props.disabled=false] - 인풋 필드를 비활성화할지 여부입니다.
 * @param {string} [props.errorMessage] - 유효성 검사 실패 시 표시될 에러 메시지입니다.
 * @param {function} [props.onSearch] - 'search' variant에서 아이콘 클릭 시 실행될 함수입니다.
 */
const Input = ({
  variant = 'default',
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  disabled = false,
  errorMessage,
  onSearch,
}) => {
  if (variant === 'search') {
    return (
      <div className="relative w-full">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          // 검색창 스타일: 흰 배경, 검은 글씨, 둥근 모서리, 내부 패딩
          className="w-full py-2 pl-5 pr-12 text-black bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button onClick={onSearch} className="absolute inset-y-0 right-0 flex items-center pr-4" aria-label="검색">
          <Icon name="search" size={1.25} className="text-black" />
        </button>
      </div>
    );
  }

  // 기본 스타일
  const errorStyle = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  const defaultStyle = 'border-gray-300 focus:border-purple-500 focus:ring-purple-500';

  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
          errorMessage ? errorStyle : defaultStyle
        }`}
      />
      {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default Input;
