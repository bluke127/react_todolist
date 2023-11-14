import { useEffect, useState } from "react";
import { ModalType } from "@/Types/index";
import { Popup } from "@/Enum/Popup";
import { useDispatch } from "react-redux";
const INITIAL_MODAL_INFO = {
  // visible: false,
};

export const ShowModal = (id: any) => {
  console.log("rrrrr", { [id]: { visible: true } });
  return {
    type: `MODAL/Setting`,
    payload: { [id]: { visible: true } },
  };
};
export const CloseModal = (id: any) => {
  return {
    type: `MODAL/Setting`,
    payload: { [id]: { visible: false } },
  };
};
export const ModalReducer = (
  state = INITIAL_MODAL_INFO,
  action: { type: string; payload: ModalType }
) => {
  switch (action.type) {
    case `MODAL/Setting`:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
