import { useEffect, useRef } from 'react';

const useIntersection = ({ update }) => {
  const refContainer = useRef(null);
  const refTarget = useRef(null);
  const refObserver = useRef(
    new window.IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          console.log('update');
          update();
        }
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
