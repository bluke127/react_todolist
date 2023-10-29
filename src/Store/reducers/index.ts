import { combineReducers } from "redux";
import { numberReducer } from "./number";
const rootReducer = combineReducers({ numberReducer });
export default rootReducer;
