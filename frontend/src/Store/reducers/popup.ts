import { useEffect, useState } from "react";
import { PopupType } from "@/Types/index";
import { Popup } from "@/Enum/Popup";
import { useDispatch } from "react-redux";
const INITIAL_POPUP_INFO = {
  type: "알림",
  visible: false,
  content: "",
  btnList: [],
};

export const ShowPopup = (popupInfo: PopupType) => {
  return {
    type: `POPUP/Show`,
    payload: { ...popupInfo, visible: true },
  };
};
export const ClosePopup = () => {
  return {
    type: `POPUP/Close`,
    payload: INITIAL_POPUP_INFO,
  };
};
export const PopupReducer = (
  state = INITIAL_POPUP_INFO,
  action: { type: string; payload: PopupType }
  ) => {
    switch (action.type) {
      case `POPUP/Show`:
        return { ...state, ...action.payload };
    case `POPUP/Close`:
      return { ...state, ...INITIAL_POPUP_INFO };
    default:
      return state;
  }
};
