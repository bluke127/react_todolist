import {
  ChangeEventHandler,
  KeyboardEventHandler,
  FormEvent,
  MouseEventHandler,
} from "react";
export interface InputType {
  value?: string | boolean | number;
  defaultValue?: string | number;
  id?: string;
  onChange?: ChangeEventHandler | Function;
  onKeyUp?: KeyboardEventHandler;
  onKeyPress?: KeyboardEventHandler;
  onInput?: (e: FormEvent, ...arg: any) => void;
  style?: any;
  wrapperStyle?: any;
  wrapperClassName?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  name?: string;
  multiple?: boolean;
  accept?: string;
  readonly?: boolean;
}
export interface DragNDropAttrType {
  cotentClassName?: string;
  checkboxReadonly?: boolean;
  contentReadonly?: boolean;
}
export interface DragNDropType extends DragNDropAttrType {
  itemList: DragNDropItemType[];
  setItemList: any;
}
export interface DragNDropItemType extends DragNDropAttrType {
  index?: number;
  value?: string | number;
  content: string | number;
}
//object의 key가 확실하지 않은 타입
export interface UnknownObj<T = any> {
  [key: string]: T;
}
//팝업이나 모달의 type
export type ModalPopupType = {
  type?: string;
  content: string;
  btnList: {
    word: string;
    func: Event | Function | MouseEventHandler<HTMLButtonElement>;
  }[];
  visible: boolean;
};
