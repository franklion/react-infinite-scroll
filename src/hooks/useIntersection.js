import { useEffect, useRef } from 'react';

/**
 * 返回內容
 * @typedef {Array} Collection
 * @property {object} refObserver - 觀察者實例
 * @property {element} refContainer - 容器
 * @property {element} refTarget - 觀察目標
 */

/**
 * 偵測元素是否已經進入可視範圍
 * @param {function} update - 進入可視範圍後觸發的回調函式
 * @returns {Array<Collection>}
 */
const useIntersection = (update) => {
  const refContainer = useRef(null);
  const refTarget = useRef(null);
  const refObserver = useRef(
    new window.IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) update();
      },
      {
        root: refContainer.current,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0
      }
    )
  );

  useEffect(() => {
    const { current: currentObserver } = refObserver;
    currentObserver.disconnect();

    if (refTarget.current) currentObserver.observe(refTarget.current);

    return () => currentObserver.disconnect();
  }, []);

  return [refObserver, refContainer, refTarget];
};

export default useIntersection;
