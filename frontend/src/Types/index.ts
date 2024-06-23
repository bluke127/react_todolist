import {
  ChangeEventHandler,
  KeyboardEventHandler,
  FormEvent,
  MouseEventHandler,
  SyntheticEvent,
  ReactNode,
} from "react";
//인풋 타입
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
//날짜
export interface DateType {
  onChange?: (date: Date, event: SyntheticEvent<any, Event>) => void;
  selectedDate: string | null;
  setSelectedDate?: Function;
  onSelect?: any;
  dateFormat?: string;
  minDate?: null | Date;
  maxDate?: null | Date;
  alwaysOpen?: boolean;
  popperClassName?: string;
  customInput?: ReactNode | null;
  className?: string;
}
//드래그앤 드랍
export interface DragNDropAttrType {
  cotentClassName?: string;
  checkboxReadonly?: boolean;
  contentReadonly?: boolean;
  readOnly?: boolean;
}
export interface DragNDropType extends DragNDropAttrType {
  contentList: DragNDropItemType[];
  setContentList?: any;
  emptyMessage?: string;
  wrapperClassName?: string;
}
export interface DragNDropItemType extends DragNDropAttrType {
  contentId?: string | number;
  checked: boolean;
  content: string | number;
}

export type PlanType = DragNDropItemType & { routineId?: number };
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

//axios type
export type AxiosType = {
  loading: boolean;
  error: null | unknown;
};
