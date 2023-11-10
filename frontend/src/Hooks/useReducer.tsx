import { Popup } from "@/Enum/Popup";
import { ClosePopup, ShowPopup } from "@/Store/reducers/popup";
import { useDispatch } from "react-redux";
function useReducer() {
  const dispatch = useDispatch();
  function setPopup(
    content: string,
    popupType: { [key in Popup]?: any } = {
      Confirm: () => {},
    }
  ) {
    let btnList: { word: string; func: Event | Function }[] = Object.entries(
      popupType
    ).map((item) => {
      let btnType = item[0];
      let btnFunc = item[1];
      if (btnType === Popup.Confirm) {
        return {
          word: "확인",
          func: async () => {
            dispatch(ClosePopup());
            await btnFunc();
          },
        };
      } else if (btnType === Popup.Close) {
        return {
          word: "닫기",
          func: async () => {
            dispatch(ClosePopup());
            await btnFunc();
          },
        };
      } else if (btnType === Popup.Cancel) {
        return {
          word: "취소",
          func: async () => {
            dispatch(ClosePopup());
            await btnFunc();
          },
        };
      }
    });
    dispatch(
      ShowPopup({
        visible: true,
        content,
        btnList,
      })
    );
  }
  return {setPopup}
}
export default useReducer;
