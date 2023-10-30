import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
function index() {
  return (
    <div>
      <Header></Header>
      <Outlet/>
      <Footer></Footer>
    </div>
  );
}

export default index;
