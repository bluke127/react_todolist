import { PopupType } from ".";
import { ModalType } from ".";
import { AxiosType } from ".";

export interface ReducerType {
  MediaQueryReducer: string;
  UtilsReducer: UtilsReducer;
  PopupReducer: PopupType;
  ModalReducer: ModalType;
  AxiosUtilsReducer: AxiosType;
}
interface UtilsReducer {
  FOCUS_TARGET: unknown;
}
interface storeType {
  number: number;
}
