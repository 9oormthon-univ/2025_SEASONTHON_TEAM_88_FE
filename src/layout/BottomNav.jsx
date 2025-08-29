import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/ui/Icon';

/**
 * 화면 하단에 위치하는 고정 네비게이션 바 컴포넌트입니다.
 * 5개의 주 메뉴를 포함하며, 현재 경로에 따라 활성화 상태를 표시합니다.
 */
const BottomNav = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  const navItems = [
    { path: '/', name: 'home', label: '홈', icon: 'home' },
    { path: '/around', name: 'around', label: '내 주변', icon: 'location' },
    { path: '/party', name: 'party', label: '내 파티', icon: 'party' },
    { path: '/wishlist', name: 'wishlist', label: '찜', icon: 'heart-outline' },
    { path: '/my', name: 'my', label: '마이', icon: 'user' },
  ];
  // Icon.jsx에 'location', 'home', 'party', 'user' 아이콘이 추가되어야 합니다.

  return (
    <nav className="fixed bottom-0 z-50 flex items-center justify-around w-full h-16 max-w-screen-sm -translate-x-1/2 border-t border-gray-800 left-1/2">
      {navItems.map((item) => {
        const isActive = activeTab === item.path;
        return (
          <Link
            to={item.path}
            key={item.name}
            className="flex flex-col items-center justify-center space-y-1 text-center"
          >
            <Icon name={item.icon} size={1.5} className={isActive ? 'text-purple-500' : 'text-gray-400'} />
            <span className={`text-xs ${isActive ? 'text-purple-500 font-bold' : 'text-gray-400'}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
