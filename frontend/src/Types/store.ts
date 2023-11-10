import { ModalPopupType } from ".";

export interface ReducerType {
  MediaQueryReducer: string;
  UtilsReducer: UtilsReducer;
  PopupReducer: ModalPopupType;
}
interface UtilsReducer {
  FOCUS_TARGET: unknown;
}
interface PopupReducer {
  ModalPopupType;
}
interface storeType {
  number: number;
}
