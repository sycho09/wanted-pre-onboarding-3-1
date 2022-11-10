import { Dispatch } from 'redux';
import { ISearchedList } from '../utils/Type';
import { ActionType } from './action-types';
import { Action } from './actions';

export const saveSearchList = (searchList: ISearchedList[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_LIST,
      payload: searchList
    });
  };
};

export const saveHistory = (history: {
  [keyword: string]: string | ISearchedList[];
}) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.HISTORY,
      payload: [history]
    });
  };
};
