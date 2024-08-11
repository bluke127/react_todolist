import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
function index() {
  return (
    <div className="layout_color w-full h-full flex flex-col justify-between">
      <div className="basis-1/8">
        <Header></Header>
      </div>
      <div className="flex justify-center flex-grow">
        <div className="py-5 px-16 shadow-2xl w-4/5 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default index;
