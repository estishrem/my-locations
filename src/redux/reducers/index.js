import { combineReducers } from 'redux';

import categories from './categories';
import locations from './locations';
import common from './common';

export default combineReducers({ categories, locations, common });
