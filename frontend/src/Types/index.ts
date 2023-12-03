import {
  ChangeEventHandler,
  KeyboardEventHandler,
  FormEvent,
  MouseEventHandler,
} from "react";
export interface InputType {
  value?: string | number;
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
  contentList: DragNDropItemType[];
  setContentList: any;
  emptyMessage?: string;
  wrapperClassName?: string;
}
export interface DragNDropItemType extends DragNDropAttrType {
  contentId?: string | number;
  checked: boolean;
  content: string | number;
}
//object의 key가 확실하지 않은 타입
export interface UnknownObj<T = any> {
  [key: string]: T;
}
//팝업이나 모달의 type
export type PopupType = {
  type?: string;
  content: string;
  btnList: {
    word: string;
    func: Event | Function | MouseEventHandler<HTMLButtonElement>;
  }[];
  visible: boolean;
};

//팝업이나 모달의 type
export type ModalType = {
  [key: string]: { visible: boolean };
};
