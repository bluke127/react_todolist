import { PopupType } from ".";
import { ModalType } from ".";

export interface ReducerType {
  MediaQueryReducer: string;
  UtilsReducer: UtilsReducer;
  PopupReducer: PopupType;
  ModalReducer: ModalType;
}
interface UtilsReducer {
  FOCUS_TARGET: unknown;
}
interface PopupReducer {
  PopupType;
}
interface storeType {
  number: number;
}
