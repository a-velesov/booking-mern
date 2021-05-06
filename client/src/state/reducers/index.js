import { authReducer } from './auth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: authReducer,
});

export default rootReducer;