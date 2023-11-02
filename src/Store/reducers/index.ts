import { combineReducers } from "redux";
import { MediaQueryReducer } from "./mediaQuery";
import { UtilsReducer } from "./utils";
const rootReducer = combineReducers({ MediaQueryReducer, UtilsReducer });
export default rootReducer;
