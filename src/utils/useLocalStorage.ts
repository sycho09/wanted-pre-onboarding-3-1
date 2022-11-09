import { ICache, ISearchedList } from './Type';

const useLocalStorage = (keyword: string, list?: ISearchedList[]) => {
  const cachingTime = 10 * 60 * 1000;
  const cachingData = new Map<string, ICache>(
    JSON.parse(localStorage.getItem('cache') || '')
  );

  const writeToCache = () => {
    cachingData.set(keyword, {
      date: new Date().getTime(),
      value: list as ISearchedList[]
    });
    localStorage.setItem('cache', JSON.stringify([...cachingData]));
  };

  const removeFromCache = () => {
    cachingData.delete(keyword);
  };

  const getFromCache = () => {
    const result = cachingData.get(keyword);
    console.log(result);
    if (result !== undefined) {
      const { date, value } = result;
      if (Date.now() - date >= cachingTime) {
        removeFromCache();
        return [];
      }
      if (Date.now() - date < cachingTime) return value;
    }
    return undefined;
  };

  return { writeToCache, getFromCache, removeFromCache };
};

export default useLocalStorage;
