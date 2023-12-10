import { DragNDropItemType, DragNDropType } from "@/Types/index";
import { useCallback, useRef } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Item from "./Item";
import useReducer from "@/Hooks/useReducer";

function DragNDrop({
  wrapperClassName,
  contentList,
  setContentList,
  cotentClassName,
  checkboxReadonly = false,
  contentReadonly = false,
  emptyMessage = "할일을 추가해주세요",
}: DragNDropType) {
  type itemKeyType = keyof Pick<
    DragNDropItemType,
    "contentId" | "content" | "checked"
  >;
  const dragItem = useRef<number | null>();
  const dragOverItem = useRef<number | null>();

  const { setPopup } = useReducer();
  const dragStart = (idx: number) => {
    console.log(idx + "start");
    dragItem.current = idx;
  };

  const dragEnter = (idx: number) => {
    console.log(idx + "enter");
    dragOverItem.current = idx;
  };

  const drop = () => {
    const copyListItems = [...contentList];
    const dragItemConotent = copyListItems[dragItem.current as number];
    copyListItems.splice(dragItem.current as number, 1);
    copyListItems.splice(dragOverItem.current as number, 0, dragItemConotent);
    dragItem.current = null;
    dragOverItem.current = null;
    setContentList(copyListItems);
    console.log("드랍");
  };
  const setContent = useCallback(
    (v: string | boolean, itemKey: itemKeyType | "delete", idx: number) => {
      if (itemKey !== "delete") {
        setContentList((arr: itemKeyType[]) => {
          (arr[idx] as any)[itemKey] = v;
          return [...arr];
        });
      } else {
        setContentList((arr: itemKeyType[]) => {
          arr.splice(idx, 1);
          return [...arr];
        });
      }
    },
    [contentList]
  );
  return (
    <div
      className={`w-full min-h-[30%] bg-brown-300 py-1 px-3 shadow-orange-50 border-slate-950 bg-yellow-600 ${wrapperClassName}`}
    >
      <ul className="w-full h-full">
        {contentList.length ? (
          contentList.map((item, index) => (
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
                setItem={(
                  v: string | boolean,
                  changeKey: itemKeyType & "delete"
                ) => setContent(v, changeKey, index)}
                cotentClassName={
                  cotentClassName + " focus:bg-white bg-transparent "
                }
                checkboxReadonly={checkboxReadonly}
                contentReadonly={contentReadonly}
              />
              <div className="basis-[5%] md:basis-[10%] sm:basis-[10%] justify-center flex">
                <MdOutlineDeleteOutline
                  className="w-3/4 h-fit md:w-full md:h-full sm:w-full sm:h-full"
                  onClick={() => setContent("_", "delete", index)}
                />
              </div>
            </li>
          ))
        ) : (
          <li className="w-full h-full flex items-center content-center justify-center">
            <span>{emptyMessage}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default DragNDrop;
