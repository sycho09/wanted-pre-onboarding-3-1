import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreator } from '../state';
import { RootState } from '../state/reducers';
import {
  Blank,
  Wrapper,
  Title,
  InputBox,
  InputContent,
  Input,
  SearchButton,
  ListBox,
  ListItem,
  ListContainer
} from '../components';
import getList from '../utils/api';
import useDebounce from '../utils/hooks/useDebounce';
import useHandleKeyup from '../utils/hooks/useHandleKeyup';
import useLocalStorage from '../utils/hooks/useLocalStorage';
import textHighligter from '../utils/textHighlighter';
import { ICache } from '../utils/Type';

export default function Main() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [noResult, setNoResult] = useState(false);

  const state = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();

  const { saveSearchList } = bindActionCreators(actionCreator, dispatch);

  const searchedKeyword = useDebounce(searchKeyword, 500);
  const { listRef, keyIndex, handleKeyup } = useHandleKeyup(
    state.searchList,
    saveSearchList
  );
  const { getFromCache, writeToCache } = useLocalStorage(searchedKeyword);

  const getFreshList = async () => {
    saveSearchList([]);

    try {
      const { data } = await getList(searchedKeyword);
      console.log('calling api');
      console.log(data);
      if (data.length > 0) {
        // saveHistory(data);
        saveSearchList(data);
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
    saveSearchList([]);
    const hasCache = getFromCache();
    console.log(hasCache);
    if (hasCache && hasCache.length > 0) saveSearchList(hasCache);
    if (!hasCache) getFreshList();
  };

  useEffect(() => {
    if (searchedKeyword !== '') isCacheInStorage();
    if (searchedKeyword === '') saveSearchList([]);
  }, [searchedKeyword]);
  console.log(state.searchList);

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
      <Title>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </Title>

      <InputBox>
        <InputContent>
          <Input
            placeholder='질환명을 입력해주세요.'
            value={searchKeyword}
            onKeyUp={handleKeyup}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </InputContent>
        <SearchButton />
      </InputBox>

      {state.searchList.length > 0 && (
        <ListContainer>
          <ListBox ref={listRef}>
            {state.searchList.map((result, i) => (
              <ListItem key={result.sickCd} isFocus={i === keyIndex && true}>
                {textHighligter(result.sickNm, searchedKeyword)}
              </ListItem>
            ))}
          </ListBox>
        </ListContainer>
      )}

      {noResult && state.searchList.length === 0 && searchKeyword !== '' && (
        <Blank>검색어 없음</Blank>
      )}
    </Wrapper>
  );
}
