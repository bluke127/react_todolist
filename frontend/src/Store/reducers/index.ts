import { combineReducers } from "redux";
import { MediaQueryReducer } from "./mediaQuery";
import { UtilsReducer } from "./utils";
import { PopupReducer } from "./popup";
const rootReducer = combineReducers({ MediaQueryReducer, UtilsReducer,PopupReducer });
export default rootReducer;
