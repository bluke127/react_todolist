import ReactDOM from "react-dom";
import { ReactNode } from "react";

export const PopupPortal = ({ children }: { children: ReactNode }) => {
  const el = document.getElementById("popup_root");
  return ReactDOM.createPortal(children, el as Element | DocumentFragment);
};
