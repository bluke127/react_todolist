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
      <div className="text-center flex justify-center items-center text-2xl font-black">
        TODO LIST
      </div>
    </>
  );
}

export default Nav;
