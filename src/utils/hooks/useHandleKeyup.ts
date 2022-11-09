import React, { useEffect, useRef, useState } from 'react';
import { ISearchedList } from '../Type';

const useHandleKeyup = (
  list: ISearchedList[],
  reset: React.Dispatch<React.SetStateAction<ISearchedList[]>>
) => {
  const [keyIndex, setKeyIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const handleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setKeyIndex((prev) => prev + 1);
    }
    if (e.key === 'ArrowUp' && keyIndex > -1) {
      setKeyIndex((prev) => prev - 1);
    }
    if (e.key === 'Escape' && keyIndex > -1) {
      setKeyIndex(-1);
      reset([]);
    }
  };

  useEffect(() => {
    setKeyIndex(-1);
  }, [list]);

  return { handleKeyup, keyIndex, listRef };
};

export default useHandleKeyup;
