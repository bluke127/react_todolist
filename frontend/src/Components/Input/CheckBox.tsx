//react
import { forwardRef, ForwardedRef, ChangeEventHandler, RefObject } from "react";
import { useId } from "react";
import { useEffect } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
export type PropsType = {
  value: string | boolean | number;
  id?: string;
  onChange?: ChangeEventHandler;
  style?: any;
  placeholder?: string;
  label?: string;
  className?: string;
  name?: string;
  checked?: boolean;
  multi?: boolean;
  readonly?: boolean;
};

const CheckBox = forwardRef(
  (props: PropsType, ref: ForwardedRef<HTMLInputElement>) => {
    const uniqueId = useId();
    //props
    const {
      value = "",
      id = uniqueId,
      onChange,
      style,
      placeholder,
      label,
      className,
      name,
      checked,
      multi,
      readonly = false,
    } = props;
    return (
      <span className="flex px-2 align-middle items-center">
        {!readonly ? (
          <label htmlFor={id} className="align-middle inline-block">
            {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </label>
        ) : null}
        <input
          id={id}
          // @ts-ignore
          value={value}
          onChange={onChange}
          style={style}
          type={"checkbox"}
          placeholder={placeholder}
          ref={ref}
          className={"hidden"}
          name={name || id}
          checked={checked}
          disabled={readonly}
        />
      </span>
    );
  }
);
CheckBox.displayName = "CheckBox";
export default CheckBox;
