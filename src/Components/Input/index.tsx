//react
import React, {
  forwardRef,
  ChangeEventHandler,
  RefObject,
  KeyboardEventHandler,
  FormEvent,
  LegacyRef,
  useId
} from "react";
import { InputType } from "src/Types";
//style
export type PropsType = InputType
const Input = forwardRef(
  (
    props: PropsType,
    ref: RefObject<HTMLInputElement> | LegacyRef<HTMLTextAreaElement>
  ) => {
    const uniqueId = useId();
    //props
    const {
      value = false,
      defaultValue = "",
      id = uniqueId,
      onChange,
      onKeyUp,
      onKeyPress,
      onInput,
      style,
      wrapperStyle,
      type = "text",
      placeholder,
      label,
      className,
      wrapperClassName,
      name,
      multiple,
      accept
    } = props;
    return (
      <span

        className={"input_wrap "+wrapperClassName}
        style={{ display: "inline-block", ...wrapperStyle }}
      >
        {props.label && <label htmlFor={id}>{label}</label>}
        {type !== "textarea" ? (
          <input
            id={id}
            // @ts-ignore
            // value={value}
            defaultValue={defaultValue}
            onChange={onChange as ChangeEventHandler}
            onInput={onInput}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            style={style}
            type={type}
            placeholder={placeholder}
            ref={ref as RefObject<HTMLInputElement>}
            className={className}
            name={name}
            multiple={multiple ? true : false}
            accept={accept}
            autoComplete={"off"}
          />
        ) : (
          <textarea
            id={id}
            // @ts-ignore
            value={value}
            onChange={onChange as ChangeEventHandler}
            onInput={onInput}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            style={style}
            // type={type}
            placeholder={placeholder}
            ref={ref as LegacyRef<HTMLTextAreaElement>}
            className={className}
            name={name}
          />
        )}
      </span>
    );
  }
);
Input.displayName = "Input";
export default React.memo(Input);