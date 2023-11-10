import { useEffect,useCallback, useRef, useState } from "react";
import DatePicker from "@/Components/DatePicker";
import { U_DATE_FORMAT } from "../Constant";
import moment from "moment";
import DragNDrop from "@/Components/DragNDrop";
import Button from "@/Components/Button";

export function Todo() {
  const [selectedDate, setSelectedDate] = useState<any>(
    moment().format(U_DATE_FORMAT)
  );
  const datePicker = useRef();
  const [planList, setPlanList] = useState([]);
  const onAddTodoList = useCallback(() => {
    alert()
    setPlanList(arr=>{
      return [...arr,{content:""}]
    })
  }, [planList]);
  // const onAddTodoList = useCallback(() => {
  //   setPlanList(arr=>{
  //     arr.push({content:""})
  //     return arr
  //   })
  // }, []);
  return (

    <div className="red w-full h-full rounded border-solid border-2 border-indigo-600 overflow-y-scroll">
      
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        alwaysOpen={true}
        ref={datePicker}
      ></DatePicker>
      {JSON.stringify(planList)}
      <DragNDrop itemList={planList} setItemList={setPlanList} contentReadonly={true} checkboxReadonly={true} cotentClassName={'w-full'}></DragNDrop>
      <Button onClick={onAddTodoList} className="w-full my-4 bg-emerald-200">추가</Button>
    </div>
  );
}

export default Todo;
