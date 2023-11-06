import React, { useId,ChangeEventHandler, useEffect, useMemo, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Input from "@/Components/Input/index";
// import "@/styles/components/Input/StatusInput.scss";
import { InputType } from "src/Types";
import { useSelector } from "react-redux";
import { ReducerType } from "@/Types/store";
interface PropsType extends InputType {
  validation?: RegExp;
  onClear?: Function | ChangeEventHandler;
}
export default function StatusInput(props: PropsType) {
  const uniqueId = useId();
  //props
  const {
    id=uniqueId,
    value = "",
    onChange,
    style,
    type,
    placeholder,
    validation,
    onClear = () => {
      (onChange as Function)("");
      (InputRef?.current as HTMLInputElement).value=""
    },
    label,
  } = props;
  //useRef
  const InputRef = useRef();
  const targetInputId: string = useSelector((s: ReducerType) => {
    console.log(s, "ss");
    return s.UtilsReducer.FOCUS_TARGET as string;
  });
  //useContext
  // const {
  //   state: { target },
  //   action: Aaction,
  // } = UseUtilsContext(); //현재 타겟이 이 element면 reset button이 보이도록
  //useMemo
  const passValidation = useMemo(() => {
    return validation?.test(value as string);
  }, [value]);

  return (
    <div className="flex">
      {props.label && <label htmlFor={id ?? ""}>{label}</label>}
      <div className="relative">
        <Input
          id={id ?? ""}
          value={value}
          onChange={onChange}
          style={style}
          type={type}
          placeholder={placeholder}
          ref={InputRef}
          className={passValidation ? "success" : "fail"}
        />
        {targetInputId === (InputRef?.current as HTMLElement)?.id && (
          <span className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 flex justify-center" onClick={()=>onClear()}>
            <AiFillCloseCircle />
          </span>
         )} 
      </div>
    </div>
  );
}
