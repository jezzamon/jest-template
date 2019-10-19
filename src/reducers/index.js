import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import comments from './comments';
import auth from './auth';
export default combineReducers({
  comments,
  auth,
  form: formReducer,
});
