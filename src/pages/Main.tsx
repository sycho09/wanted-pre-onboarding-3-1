import { useEffect, useState } from 'react';
import {
  Blank,
  Wrapper,
  Title,
  InputBox,
  Input,
  SearchButton,
  ListBox,
  ListItem
} from '../components';
import getList from '../utils/api';
import useDebounce from '../utils/hooks/useDebounce';
import useHandleKeyup from '../utils/hooks/useHandleKeyup';
import useLocalStorage from '../utils/hooks/useLocalStorage';
import textHighligter from '../utils/textHighlighter';
import { ICache, ISearchedList } from '../utils/Type';

export default function Main() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchList, setSearchList] = useState<ISearchedList[]>([]);
  const [noResult, setNoResult] = useState(false);

  const searchedKeyword = useDebounce(searchKeyword, 500);
  const { listRef, keyIndex, handleKeyup } = useHandleKeyup(
    searchList,
    setSearchList
  );
  const { getFromCache, writeToCache } = useLocalStorage(searchedKeyword);

  const getFreshList = async () => {
    setSearchList(() => []);
    try {
      const { data } = await getList(searchedKeyword);
      console.log('calling api');
      if (data.length > 0) {
        setSearchList(() => data);
        writeToCache(data);
      }
      if (data.length < 1) {
        setNoResult(() => true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isCacheInStorage = () => {
    setSearchList(() => []);
    const hasCache = getFromCache();

    if (hasCache && hasCache.length > 0) {
      setSearchList(() => hasCache);
    }

    if (!hasCache) {
      getFreshList();
    }
  };

  useEffect(() => {
    if (searchedKeyword !== '') isCacheInStorage();
    if (searchedKeyword === '') setSearchList([]);
  }, [searchedKeyword]);

  useEffect(() => {
    const isStorageEmpty = localStorage.getItem('cache');
    if (!isStorageEmpty || isStorageEmpty.length < 1) {
      localStorage.setItem(
        'cache',
        JSON.stringify([...new Map<string, ICache>()])
      );
    }
  }, []);

  return (
    <Wrapper>
      <Title>국내 모든 임상시험 검색하고</Title>
      <Title>온라인으로 참여하기</Title>

      <InputBox>
        <Input
          value={searchKeyword}
          onKeyUp={handleKeyup}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <SearchButton>검색</SearchButton>
      </InputBox>

      <div style={{ overflow: 'hidden' }}>
        {searchList.length > 0 && (
          <ListBox ref={listRef}>
            {searchList.map((result, i) => (
              <ListItem key={result.sickCd} isFocus={i === keyIndex && true}>
                {textHighligter(result.sickNm, searchedKeyword)}
              </ListItem>
            ))}
          </ListBox>
        )}
      </div>
      {noResult && searchList.length < 1 && searchKeyword !== '' && (
        <Blank>검색어 없음</Blank>
      )}
    </Wrapper>
  );
}
