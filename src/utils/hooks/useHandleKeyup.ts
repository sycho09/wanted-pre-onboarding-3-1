import React, { useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import { Action } from '../../state/actions';
import { ISearchedList } from '../Type';

const useHandleKeyup = (
  list: ISearchedList[],
  reset: (searchList: ISearchedList[]) => (dispatch: Dispatch<Action>) => void
) => {
  const [keyIndex, setKeyIndex] = useState(-2);
  const listRef = useRef<HTMLUListElement>(null);

  const handleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      keyIndex > list.length - 2
        ? setKeyIndex(() => list.length - 1)
        : setKeyIndex((prev) => prev + 1);
    }
    if (e.key === 'ArrowUp' && keyIndex > -1) {
      keyIndex < 1 ? setKeyIndex(() => 0) : setKeyIndex((prev) => prev - 1);
    }
    if (e.key === 'Escape') {
      setKeyIndex(-1);
      reset([]);
    }
  };

  useEffect(() => {
    setKeyIndex(-2);
  }, [list]);

  return { handleKeyup, keyIndex, listRef };
};

export default useHandleKeyup;
