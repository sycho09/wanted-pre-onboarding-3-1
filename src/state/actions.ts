import { ISearchedList } from '../utils/Type';
import { ActionType } from './action-types';

interface ListAction {
  type: ActionType.SEARCH_LIST;
  payload: ISearchedList[];
}

interface HistoryAction {
  type: ActionType.HISTORY;
  payload: { [keyword: string]: string | ISearchedList[] }[];
}

export type Action = ListAction | HistoryAction;
