import {combineReducers} from 'redux';
import AllLoginReducer from './login-reducer';
import AllPopupReducer from './popup-reducer'

const rootReducer = combineReducers(
    {
        allLogins: AllLoginReducer,
        allPopup: AllPopupReducer,
    }
)

export default rootReducer;