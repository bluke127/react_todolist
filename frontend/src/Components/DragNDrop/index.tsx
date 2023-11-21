import { DragNDropType } from "@/Types/index";
import { useCallback, useRef } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Item from "./Item";
import useReducer from "@/Hooks/useReducer";

function DragNDrop({
  contentList,
  setContentList,
  cotentClassName,
  checkboxReadonly = false,
  contentReadonly = false,
}: DragNDropType) {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const { setPopup } = useReducer();
  const dragStart = (idx) => {
    console.log(idx + "start");
    dragItem.current = idx;
  };

  const dragEnter = (idx) => {
    console.log(idx + "enter");
    dragOverItem.current = idx;
  };

  const drop = () => {
    const copyListItems = [...contentList];
    const dragItemConotent = copyListItems[dragItem.current as number];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemConotent);
    dragItem.current = null;
    dragOverItem.current = null;
    setContentList(copyListItems);
    console.log("드랍");
  };
  const setContent = useCallback(
    (v, itemKey, idx) => {
      if (itemKey !== "delete") {
        setContentList((arr) => {
          arr[idx][itemKey] = v;
          return [...arr];
        });
      } else {
        setContentList((arr) => {
          arr.splice(idx, 1);
          return [...arr];
        });

        setPopup("삭제되었습니다");
      }
    },
    [contentList]
  );
  return (
    <div className="w-full min-h-[30%] bg-brown-300 py-1 px-3 shadow-orange-50 border-slate-950 bg-yellow-600">
      {JSON.stringify(contentList) + "contentListcontentList"}
      <ul>
        {contentList.map((item, index) => (
          <li
            key={index}
            draggable
            className="flex border-y-stone-900 border-b-2 cursor-grab actvie:cursor-grab"
            onDragStart={() => dragStart(index)}
            onDragEnter={() => dragEnter(index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={drop}
          >
            <Item
              item={item}
              setItem={(v, changeKey) => setContent(v, changeKey, index)}
              cotentClassName={
                cotentClassName + " focus:bg-white bg-transparent "
              }
              checkboxReadonly={checkboxReadonly}
              contentReadonly={contentReadonly}
            />
            <div className="basis-[5%] justify-center flex">
              <MdOutlineDeleteOutline
                className="w-3/4 h-fit"
                onClick={() => setContent("_", "delete", index)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DragNDrop;
