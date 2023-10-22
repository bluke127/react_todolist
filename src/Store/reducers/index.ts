import { combineReducers } from "redux";
import { reducer as numReducer } from "./number";
const rootReducer = combineReducers({ numReducer });
export default rootReducer;
