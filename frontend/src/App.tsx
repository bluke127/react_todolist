import { FocusEventHandler, MouseEventHandler, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { SetMediaQuery } from "./Store/reducers/mediaQuery";
import { SetFocusTarget } from "./Store/reducers/utils";

import Layout from "@/Layout/index";
import { useMediaQuery } from "react-responsive";
import { redirect } from "react-router-dom";
import { PopupPortal } from "./Components/Popup/PopupPortal";
import Popup from "./Components/Popup";
import { ReducerType } from "@/Types/store";

function App() {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const axiosResult = useSelector(
    (state: ReducerType) => state.AxiosUtilsReducer
  );

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

  const setTarget: unknown = (e: FocusEvent | MouseEvent) => {
    let t = e.target as EventTarget;
    if (t instanceof Element) {
      dispatch(SetFocusTarget(t.id));
    }
  };
  useEffect(() => {
    redirect("/todo");
    document.getElementById("root")!.style.height = `${window.innerHeight}px`;
  }, []);
  return (
    <>
      {axiosResult && axiosResult.loading ? <div>로딩중</div> : null}
      <div
        className="App w-full h-full"
        onFocus={setTarget as FocusEventHandler}
        onClick={setTarget as MouseEventHandler}
      >
        {JSON.stringify(axiosResult) + "SSSSSSS"}
        <Layout />
        <PopupPortal>
          <Popup />
        </PopupPortal>
      </div>
    </>
  );
}

export default App;
