import React, {
  useEffect,
  MouseEventHandler,
  useCallback,
  Dispatch,
} from "react";
import { EnumType } from "typescript";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "@/Types/store";
import { AnyAction } from "redux";
import { ClosePopup } from "@/Store/reducers/popup";
import Button from "../Button";
export default function Popup() {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const popupInfo = useSelector((s: ReducerType) => {
    return s.PopupReducer;
  });
  const onClose = useCallback(() => {
    dispatch(ClosePopup());
  }, []);
  useEffect(() => {
    document.getElementById("popup_root").style.height = `${
      popupInfo.visible ? window.innerHeight : 0
    }px`;
    document.getElementById("popup_root").style.width = `${
      popupInfo.visible ? window.innerWidth : 0
    }px`;
  }, [popupInfo.visible]);
  return (
    <>
      {popupInfo.visible ? (
        <div className="relative w-full h-full bg-gray-400 flex-center">
          <div className="w-3/4 h-1/4 bg-white border-orange-500 flex flex-col justify-between">
            <div className="w-full h-1/5 bg-orange-500 flex justify-between items-center px-2">
              <div className="text-white">{popupInfo.type}</div>
              <p onClick={onClose}>
                <IoMdCloseCircleOutline />
              </p>
            </div>
            <div className=" flex-center flex-grow-1">{popupInfo.content}</div>
            <div className="w-full h-1/5 bg-blue flex justify-between">
              {popupInfo.btnList.map((item, idx) => (
                <Button
                  className="text-black bg-orange-500 h-full w-full"
                  onClick={item.func as MouseEventHandler<HTMLButtonElement>}
                  key={idx}
                >
                  {item.word}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
