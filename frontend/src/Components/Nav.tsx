import React from "react";
import { useSelector } from "react-redux";
import Input from "./Input";
import { ReducerType } from "@/Types/store";

function Nav() {
  const mediaQuery = useSelector(
    (state: ReducerType) => state.MediaQueryReducer
  );
  return (
    <>
      <div>mediaQuery : {mediaQuery}</div>
      <div>Nav</div>
    </>

  );
}

export default Nav;
