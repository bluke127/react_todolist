import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import rootReducer from "@/Store/reducers";
import Todo from "./Pages/Todo";
import ComponentTest from "./Pages/ComponentTest";
import "./index.css"
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore({
  reducer: rootReducer, // combineReducers로 리듀서를 묶은 리덕스 모듈 파일
  // middleware: [ReduxThunk, logger], // 사용할 미들웨어들을 나열
  devTools: true, // 기본은 true로 설정되어있다. 개발자 도구의 사용 여부를 정한다.
  // preloadedState: {
  //   loading: {
  //     loadingState: true,
  //     loadingTest: "123 Loading!",
  //   },
  // }, // 리덕스 스토어가 생성될 때, 초기값을 정의한다.
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Todo />, path: "" },
      { element: <ComponentTest />, path: "/component" },
    ],
  },
]);
root.render(
  //   <App />
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
