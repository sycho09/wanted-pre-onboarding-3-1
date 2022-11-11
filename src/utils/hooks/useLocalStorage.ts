import { ICache, ISearchedList } from '../Type';

const useLocalStorage = (keyword: string) => {
  const cachingTime = 10 * 60 * 1000;

  const cachingData = localStorage.getItem('cache')
    ? new Map<string, ICache>(JSON.parse(localStorage.getItem('cache') || ''))
    : new Map<string, ICache>();

  const writeToCache = (list: ISearchedList[]) => {
    cachingData.set(keyword, {
      date: new Date().getTime(),
      value: list
    });
    localStorage.setItem('cache', JSON.stringify([...cachingData]));
  };

  const getFromCache = () => {
    const result = cachingData.get(keyword);
    if (result !== undefined) {
      const { date, value } = result;
      if (Date.now() - date >= cachingTime) {
        cachingData.delete(keyword);
        return undefined;
      }
      if (Date.now() - date < cachingTime) return value;
    }
    return undefined;
  };

  return { writeToCache, getFromCache };
};

export default useLocalStorage;
