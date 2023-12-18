import { combineReducers } from "redux";
import { MediaQueryReducer } from "./mediaQuery";
import { UtilsReducer } from "./utils";
import { PopupReducer } from "./popup";
import { ModalReducer } from "./modal";
import { AxiosUtilsReducer } from "./axiosUtils";
const rootReducer = combineReducers({
  MediaQueryReducer,
  UtilsReducer,
  PopupReducer,
  ModalReducer,
  AxiosUtilsReducer,
});
export default rootReducer;
