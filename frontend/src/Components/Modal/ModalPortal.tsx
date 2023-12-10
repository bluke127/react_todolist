import ReactDOM from "react-dom";
import { ReactNode } from "react";

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const el = document.getElementById("modal_root");
  return ReactDOM.createPortal(children, el as Element | DocumentFragment);
};
export default ModalPortal;
