import {combineReducers} from 'redux';
import AllLoginReducer from './login-reducer';
import AllPopupReducer from './popup-reducer'
import AllViewEditReducer from './viewedit-reducer'
import ViewReportReducer from './viewreport-reducer'
import ConfirmPopUpReducer from './confirmpopup-reducer'
import ViewsSingleCaseReducer from './viewsSingleCase-reducer';
import AssignphipopupReducer from './assignphipopup-reducer';
import UnassigncasepopupReducer from './unassigncasepopup-reducer';
import Assignmohpopup from './assignmohpopup-reducer';

const rootReducer = combineReducers(
    {
        allLogins: AllLoginReducer,
        allPopup: AllPopupReducer,
        allViewEditReducer: AllViewEditReducer,
        viewReportReducer: ViewReportReducer,
        confirmPopUp: ConfirmPopUpReducer,
        viewsSingleCase: ViewsSingleCaseReducer,
        assignphipopupReducer: AssignphipopupReducer,
        unassigncasepopupReducer: UnassigncasepopupReducer,
        assignmohpopup: Assignmohpopup,
    }
)

export default rootReducer;