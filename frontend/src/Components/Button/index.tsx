import React, { useCallback, useEffect, useRef } from "react";
import CSS from "csstype";
type PropsType = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: CSS.Properties;
  children: React.ReactNode;
  isDebouncedButton?: boolean;
  className?:string
};
function Button(props: PropsType) {
  //props
  // onClick, style, children : 버튼 내용, isDebouncedButton : 디바운스 할 버튼인지
  const { onClick, style, children, className,isDebouncedButton = true } = props;
  //useRef
  const buttonRef = useRef(null);
  let timeout: number | ReturnType<typeof setTimeout>;
  //useCallback
  const debounce = useCallback((func: Function, ms: number) => {
    // 현재 타이머가 실행되고 있으면 timeout에 타이머의 id를 저장한다.

    return () => {
      // 만약 타이머가 실행되고 있으면 현재 타이머를 지운다.
      if (timeout) {
        clearTimeout(timeout);
      }

      // timeout에 새로운 타이머를 할당한다. 만약 ms만큼 시간이 지났으면 함수를 실행한다.
      timeout = setTimeout(() => {
        func();
      }, ms);
    };
  }, []);
  return (
    <button
      className={className+" rounded"}
      ref={buttonRef}
      style={style}
      onClick={isDebouncedButton ? debounce(onClick, 500) : onClick}
    >
      {children}
    </button>
  );
}
export default React.memo(Button);
