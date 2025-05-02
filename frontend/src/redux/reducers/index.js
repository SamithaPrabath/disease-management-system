import { combineReducers } from 'redux';
import AllLoginReducer from './login-reducer';
import AllResetPasswordReducer from "./resetPassword-reducer"
import AllPopupReducer from './popup-reducer'
import AllViewEditReducer from './viewedit-reducer'
import ViewReportReducer from './viewreport-reducer'
import ConfirmPopUpReducer from './confirmpopup-reducer'
import ViewsSingleCaseReducer from './viewsSingleCase-reducer';
import AssignphipopupReducer from './assignphipopup-reducer';
import UnassigncasepopupReducer from './unassigncasepopup-reducer';
import Assignmohpopup from './assignmohpopup-reducer';
import ViewEditEvent from './viewEditEvent-reducer';
import ViewAddNewCaseReducer from './viewAddNewCaseReducer';

const rootReducer = combineReducers(
    {
        allLogins: AllLoginReducer,
        allResetPasswordReducer: AllResetPasswordReducer,
        allPopup: AllPopupReducer,
        allViewEditReducer: AllViewEditReducer,
        viewReportReducer: ViewReportReducer,
        confirmPopUp: ConfirmPopUpReducer,
        viewsSingleCase: ViewsSingleCaseReducer,
        assignphipopupReducer: AssignphipopupReducer,
        unassigncasepopupReducer: UnassigncasepopupReducer,
        assignmohpopup: Assignmohpopup,
        viewEditEvent: ViewEditEvent,
        viewAddNewCase: ViewAddNewCaseReducer,
    }
)

export default rootReducer;