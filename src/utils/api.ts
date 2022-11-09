import { ISearchedList } from './Type';
import request from './axios';

const getList = (pathname: string) => {
  const response = request.get<ISearchedList[]>(`?q=${pathname}`);
  return response;
};

export default getList;
