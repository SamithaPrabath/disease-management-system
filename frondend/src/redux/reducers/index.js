import {combineReducers} from 'redux';
import AllLoginReducer from './login-reducer';
import AllPopupReducer from './popup-reducer'
import AllViewEditReducer from './viewedit-reducer'

const rootReducer = combineReducers(
    {
        allLogins: AllLoginReducer,
        allPopup: AllPopupReducer,
        allViewEditReducer: AllViewEditReducer,
    }
)

export default rootReducer;