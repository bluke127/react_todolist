import React, {
  useId,
  ChangeEventHandler,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Input from "@/Components/Input/index";
import { InputType } from "src/Types";
import { useSelector } from "react-redux";
import { ReducerType } from "@/Types/store";
interface PropsType extends InputType {
  validation?: RegExp; //정규식
  onClear?: Function | ChangeEventHandler; //값 클리어
}
export default function StatusInput(props: PropsType) {
  const uniqueId = useId(); //element 고유한 id / clear할 input세팅에 필요
  //props
  const {
    id = uniqueId,
    value = "",
    onChange,
    style,
    type,
    placeholder,
    validation,
    onClear = () => {
      (onChange as Function)("");
      (InputRef?.current! as HTMLInputElement).value = "";
    },
    label,
    readonly,
    className,
  } = props;
  //useRef
  const InputRef = useRef(null);
  const targetInputId: string = useSelector((s: ReducerType) => {
    return s.UtilsReducer.FOCUS_TARGET as string;
  });
  //useMemo
  const passValidation = useMemo(() => {
    return validation?.test(value as string);
  }, [value]);

  return (
    <div className="flex grow">
      {props.label && <label htmlFor={id ?? ""}>{label}</label>}
      <div className="relative w-full align-middle">
        <Input
          id={id ?? ""}
          value={value}
          onChange={onChange}
          style={style}
          type={type}
          placeholder={placeholder}
          ref={InputRef}
          className={className + (passValidation ? " success" : " fail")}
          readonly={readonly}
        />
        {/* 클리어 버튼 */}
        {targetInputId === (InputRef?.current! as HTMLElement)?.id &&
          !readonly && (
            <span
              className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 flex justify-center"
              onClick={() => onClear()}
            >
              <AiFillCloseCircle />
            </span>
          )}
      </div>
    </div>
  );
}
