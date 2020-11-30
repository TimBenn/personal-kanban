import { combineReducers } from 'redux';
import boardReducer from './boardSlice';
import themeReducer from './themeSlice';

export default combineReducers({
  boardReducer,
  themeReducer,
});
