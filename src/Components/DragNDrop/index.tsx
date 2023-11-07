import { useCallback, useRef } from "react";
import Item from "./Item";

function DragNDrop({ itemList, setItemList }) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragStart = (idx) => {
    console.log(idx+"start")
    dragItem.current = idx;
  };

  const dragEnter = (idx) => {
    console.log(idx+"enter")
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
    <ul>
      {itemList.map((item, index) => (
        <li
        key={index}
        draggable
          className="cursor-grab actvie:cursor-grab"
          onDragStart={() => dragStart(index)}
          onDragEnter={() => dragEnter(index)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={drop}
        >
        start{JSON.stringify(dragItem.current)}<br/>
        enetr{JSON.stringify(dragOverItem.current)}
          <Item value={item.value} index={index} content={item.content} />{" "}
        </li>
      ))}
    </ul>
  );
}

export default DragNDrop;
