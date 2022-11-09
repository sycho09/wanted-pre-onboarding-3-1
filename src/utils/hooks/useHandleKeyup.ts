import React, { useEffect, useState } from 'react';
import { ISearchedList } from '../Type';

const useHandleKeyup = (list: ISearchedList[]) => {
  const [keyIndex, setKeyIndex] = useState(-1);

  const handleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setKeyIndex((prev) => prev + 1);
    }
    if (e.key === 'ArrowUp' && keyIndex > -1) {
      setKeyIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setKeyIndex(-1);
  }, [list]);

  return { handleKeyup, keyIndex };
};

export default useHandleKeyup;
