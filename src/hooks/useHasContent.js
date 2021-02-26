import { useMemo } from 'react';

const useHasContent = ({ isLoading, content }) => {
  console.log('content', content);

  const hasContent = useMemo(() => {
    const isArrayContent = content.constructor === Array;
    const isObjectContent = content.constructor === Object;

    if (isArrayContent) {
      return content && content.length > 0 && !isLoading;
    }

    if (isObjectContent) {
      return content && Object.keys(content).length > 0 && !isLoading;
    }

    return false;
  }, [isLoading, content]);

  return [hasContent];
};

export default useHasContent;
