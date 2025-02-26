import {combineReducers} from 'redux';
import AllLoginReducer from './login-reducer';
import AllPopupReducer from './popup-reducer'
import AllViewEditReducer from './viewedit-reducer'
import ViewReportReducer from './viewreport-reducer'
import ConfirmPopUpReducer from './confirmpopup-reducer'

const rootReducer = combineReducers(
    {
        allLogins: AllLoginReducer,
        allPopup: AllPopupReducer,
        allViewEditReducer: AllViewEditReducer,
        viewReportReducer: ViewReportReducer,
        confirmPopUp: ConfirmPopUpReducer,
    }
)

export default rootReducer;