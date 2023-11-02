import { ChangeEventHandler, KeyboardEventHandler, FormEvent } from "react";
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
}
