import React, {
  useEffect,
  MouseEventHandler,
  useCallback,
  Dispatch,
  useState,
  useMemo,
  useId,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "@/Types/store";
import { AnyAction } from "redux";
import { CloseModal } from "@/Store/reducers/modal";
import ModalPortal from "./ModalPortal";

export default function Modal(props) {
  const { id, children, wrapperClassName='w-3/4 h-1/4' }: { id; children; wrapperClassName? } = props;

  const dispatch: Dispatch<AnyAction> = useDispatch();
  const modalInfo = useSelector((s: ReducerType) => {
    return s.ModalReducer;
  });

  const onClose = useCallback(() => {
    dispatch(CloseModal(id));
  }, []);
  const visible = useMemo(() => {
    return modalInfo[id]?.visible;
  }, [modalInfo]);

  useEffect(() => {
    document.getElementById("modal_root").style.height = `${
      visible ? window.innerHeight : 0
    }px`;
    document.getElementById("modal_root").style.width = `${
      visible ? window.innerWidth : 0
    }px`;
  }, [visible]);
  return (
    <>
      {visible ? (
        <ModalPortal>
          <div className="relative w-full h-full bg-gray-400 flex-center">
            <div className={wrapperClassName+ " bg-white border-orange-500 flex flex-col justify-between"}>
              <div className="w-full h-20rem bg-orange-500 flex justify-between items-center px-2">
                <div className="text-white">{}</div>
                <p onClick={onClose}>
                  <AiOutlineClose />
                </p>
              </div>
              <div className=" flex-center grow">{children}</div>
            </div>
          </div>
        </ModalPortal>
      ) : null}
    </>
  );
}
