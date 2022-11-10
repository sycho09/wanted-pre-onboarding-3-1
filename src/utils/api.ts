import { ISearchedList } from './Type';
import request from './axios';

const getList = (pathname: string) => {
  const response = request.get<ISearchedList[]>(`?sickNm_like=${pathname}`);
  return response;
};

export default getList;
