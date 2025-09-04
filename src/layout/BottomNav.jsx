import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/ui/Icon';

const BottomNav = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  const navItems = [
    { path: '/home', name: 'home', label: '홈', icon: 'home-nav' },
    { path: '/around', name: 'around', label: '내 주변', icon: 'around' },
    { path: '/party', name: 'party', label: '내 파티', icon: 'party-nav' },
    { path: '/wishlist', name: 'wishlist', label: '찜', icon: 'like' },
    { path: '/my', name: 'my', label: '마이', icon: 'my' },
  ];

  return (
    <nav
      style={{ boxShadow: '0 -3px 6px 0 rgba(0,0,0,0.05)' }}
      className="fixed bottom-0 flex items-center justify-around w-full h-16 max-w-screen-sm -translate-x-1/2 bg-white left-1/2"
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.path;
        return (
          <Link
            to={item.path}
            key={item.name}
            className="flex flex-col items-center justify-center space-y-1 text-center"
          >
            <Icon
              name={item.icon}
              size={1.5}
              style={{ stroke: 'currentColor', fill: 'currentColor' }}
              className={isActive ? 'text-[#8371FD]' : 'text-gray-600'}
            />
            <span
              className={`text-[0.75rem] font-pretendard ${
                isActive ? 'text-[#8371FD] font-semibold' : 'text-gray-600'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
