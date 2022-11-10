import { ISearchedList } from '../../utils/Type';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface INITIAL_STATE {
  searchList: ISearchedList[];
  history: { [keyword: string]: string | ISearchedList[] }[];
}

const initialState: INITIAL_STATE = {
  searchList: [],
  history: [{ name: '', date: [] }]
};

const listReducers = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SEARCH_LIST:
      return {
        ...state,
        searchList: action.payload
      };
    case ActionType.HISTORY:
      return { ...state, history: [...state.history, ...action.payload] };
    default:
      return state;
  }
};

export default listReducers;
