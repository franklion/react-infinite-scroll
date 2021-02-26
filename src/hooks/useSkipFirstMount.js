/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

/**
 * 處理 React useEffect 跳過第一次響應
 * @param {Callback} fn - 自訂函式
 * @param {Array} deps - useEffect 依賴
 * @returns {void}
 */
const useSkipFirstMount = (fn, deps) => {
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    fn();
  }, deps);
};

export default useSkipFirstMount;
