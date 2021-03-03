import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * 非同步請求返回內容
 * @typedef {Object} Collection
 * @property {function} execute - 執行非同步請求
 * @property {boolean} isLoading - 請求是否為載入中
 * @property {object} response - 請求得到的資訊
 * @property {string} error - 錯誤訊息
 */

/**
 * 選擇性參數
 * @typedef {object} Options
 * @property {boolean} [immediate] - 是否立即呼叫非同步請求
 * @property {object|*} [initParams] - 立即呼叫非同步請求的參數
 */

/**
 * 發送一個非同步請求
 * @callback AsyncCallback - 非同步請求
 */

/**
 * 處理非同步請求
 * @param {AsyncCallback} asyncFunction - 非同步請求
 * @param {Options} options - 選擇性參數
 * @returns {Object<Collection>}
 */
const useAsync = (asyncFunction, { immediate = false, initParams = null } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const refImmediate = useRef(immediate);
  const refInitParams = useRef(initParams);

  const execute = useCallback(
    (params) => {
      setIsLoading(true);
      setResponse(null);
      setError(null);
      return asyncFunction(params)
        .then((response) => {
          setResponse(response);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (refImmediate.current) {
      execute(refInitParams.current);
    }
  }, [execute]);

  return { execute, isLoading, response, error };
};

export default useAsync;
