import { useCallback, useRef } from "react";
import Item from "./Item";

function DragNDrop({ itemList, setItemList }) {
  const dragItem = useRef()
  const dragOverItem = useRef()
  const dragStart = (e, position) =>{
    console.log(e, position,"dragStart")
  }
  const a:any = useCallback(e=>{
  console.log(e,"eee")
  },[])
  return (
    <ul>
      {itemList.map((item, index) => (
        <li key={index} draggable className="cursor-grab actvie:cursor-grab" onDragEnd={a}>
          <Item value={item.value} index={index} content={item.content} />{" "}
        </li>
      ))}
    </ul>
  );
}

export default DragNDrop;
