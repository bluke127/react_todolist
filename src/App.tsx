import Test01 from "@/Pages/Test01";
import {
  FocusEventHandler,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { SetMediaQuery } from "./Store/reducers/mediaQuery";
import { SetFocusTarget } from "./Store/reducers/utils";

import Layout from "@/Layout/index";
import { useMediaQuery } from "react-responsive";
import { redirect } from "react-router-dom";

function App() {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const selector: string = useSelector((s: ReducerType) => {
    console.log(s, "ss");
    return s.UtilsReducer.FOCUS_TARGET as string;
  });

  const isDesktop: boolean = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isTablet: boolean = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:767px)",
  });
  useEffect(() => {
    dispatch(
      SetMediaQuery(isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop")
    );
  }, [isDesktop, isTablet, isMobile]);
  const setTarget: (e: any) => void = (e: FocusEvent) => {
    let t: EventTarget = e.target;
    if (t instanceof Element) {
      dispatch(SetFocusTarget(t.id));
    }
  };
  useEffect(() => {
    redirect("/todo");
  }, []);
  return (
    <div className="App" onFocus={setTarget} onClick={setTarget}>
      selector:{selector}
      <Layout />
    </div>
  );
}

export default App;
