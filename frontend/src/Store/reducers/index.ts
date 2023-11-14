import { combineReducers } from "redux";
import { MediaQueryReducer } from "./mediaQuery";
import { UtilsReducer } from "./utils";
import { PopupReducer } from "./popup";
import { ModalReducer } from "./modal";
const rootReducer = combineReducers({ MediaQueryReducer, UtilsReducer,PopupReducer, ModalReducer });
export default rootReducer;
