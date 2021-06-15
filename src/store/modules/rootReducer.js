import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import locale from './laguage/reducer';

export default combineReducers({ auth, user, locale });
