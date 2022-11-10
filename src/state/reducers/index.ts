import { combineReducers } from 'redux';
import listReducers from './reducers';

const reducers = combineReducers({
  list: listReducers
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
