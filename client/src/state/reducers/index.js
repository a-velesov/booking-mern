import { authReducer } from './auth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;