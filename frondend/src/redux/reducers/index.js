import {combineReducers} from 'redux';
import AllLoginReducer from './login-reducer';

const rootReducer = combineReducers(
    {
        allLogins: AllLoginReducer,
    }
)

export default rootReducer;