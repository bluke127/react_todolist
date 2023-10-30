import Test01 from "@/Pages/Test01";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { SetMediaQuery } from "./Store/reducers/mediaQuery";

import Layout from "@/Layout/index";
import { useMediaQuery } from "react-responsive";
import { redirect } from "react-router-dom";

function App() {
  const dispatch: Dispatch<AnyAction> = useDispatch();

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
  useEffect(() => {
    redirect('/todo')
  }, []);
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
