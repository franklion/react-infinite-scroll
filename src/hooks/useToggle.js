import { useReducer } from 'react';

const toggleReducer = (state, nextValue) => (typeof nextValue === 'boolean' ? nextValue : !state);

/**
 * 處理開關
 * @param {boolean} initialValue - 開關初始狀態
 * @returns {Array}
 */
const useToggle = (initialValue) => {
  return useReducer(toggleReducer, initialValue);
};

export default useToggle;
