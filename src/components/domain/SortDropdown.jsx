import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../ui/Icon';

const SORT_OPTIONS = ['인기순', '최신순', '찜많은순', '리뷰많은순', '저가순', '고가순', '할인율높은순'];

const SortDropdown = ({ isOpen, onClose, currentSort, onSortChange }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/30"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white rounded-t-2xl"
          >
            <h3 className="mb-4 text-lg font-bold">보기정렬</h3>
            <ul>
              {SORT_OPTIONS.map((option) => (
                <li key={option} className="py-3 border-b last:border-none">
                  <button
                    onClick={() => {
                      onSortChange(option);
                      onClose();
                    }}
                    className="flex items-center justify-between w-full"
                  >
                    <span className={currentSort === option ? 'font-bold text-purple-600' : ''}>{option}</span>
                    {currentSort === option && <Icon name="check" size={1.5} color="text-purple-600" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SortDropdown;
