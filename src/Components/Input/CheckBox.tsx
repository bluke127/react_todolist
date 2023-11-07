//react
import { forwardRef, ChangeEventHandler, RefObject } from "react";
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
};

const CheckBox = forwardRef(
  (props: PropsType, ref: RefObject<HTMLInputElement>) => {
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
    } = props;
    useEffect(() => {
      console.log(ref, "ss");
    }, [ref]);
    return (
      <span className="inline-block p-2">
        <label htmlFor={id} className=" align-middle inline-block">
          {value ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </label>
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
        />
      </span>
    );
  }
);
CheckBox.displayName = "CheckBox";
export default CheckBox;
