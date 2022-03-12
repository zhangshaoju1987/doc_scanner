import { combineReducers } from 'redux';
import setting from './setting';
import invoice from './invoice';

export default combineReducers({
    setting,
    invoice
});
