export interface ISearchedList {
  sickCd: string;
  sickNm: string;
}
export interface ICache {
  date: number;
  value: ISearchedList[];
}
