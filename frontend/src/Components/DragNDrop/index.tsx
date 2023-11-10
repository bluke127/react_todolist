import { DragNDropType } from "@/Types/index";
import { useCallback, useRef } from "react";
import Item from "./Item";

function DragNDrop({
  itemList,
  setItemList,
  cotentClassName,
  checkboxReadonly = false,
  contentReadonly = false,
}:DragNDropType) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragStart = (idx) => {
    console.log(idx + "start");
    dragItem.current = idx;
  };

  const dragEnter = (idx) => {
    console.log(idx + "enter");
    dragOverItem.current = idx;
  };

  const drop = () => {
    const copyListItems = [...itemList];
    const dragItemConotent = copyListItems[dragItem.current as number];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemConotent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItemList(copyListItems);
    console.log("드랍");
  };
  return (
    <div className="w-full min-h-[30%] bg-brown-300 py-1 px-3 shadow-orange-50 border-slate-950 bg-yellow-600">
      <ul>
        {itemList.map((item, index) => (
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
              value={item.value}
              index={index}
              content={item.content}
              cotentClassName={cotentClassName}
              checkboxReadonly={checkboxReadonly}
              contentReadonly={contentReadonly}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DragNDrop;
