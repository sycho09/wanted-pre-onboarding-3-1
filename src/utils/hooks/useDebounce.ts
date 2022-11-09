import { useEffect, useState } from 'react';

const useDebounce = (keyword: string, delay: number) => {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, delay);

    return () => clearTimeout(timer);
  }, [keyword]);

  return debouncedKeyword;
};

export default useDebounce;
