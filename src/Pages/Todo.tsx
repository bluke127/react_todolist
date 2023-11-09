import { useEffect, useRef, useState } from "react";
import DatePicker from "@/Components/DatePicker";
import { U_DATE_FORMAT } from "../Constant";
import moment from "moment";

export function Todo() {
  const [selectedDate, setSelectedDate] = useState<any>(
    moment().format(U_DATE_FORMAT)
  );
  const datePicker = useRef()
  const a = `${datePicker}`
  useEffect(()=>{
    console.log(datePicker.current,"ssssssss")
  },[])
  return (
    <div className="red w-full h-full rounded border-solid border-2 border-indigo-600">
      <div className={`bg-red-700 h-[${datePicker.current?(datePicker?.current as HTMLElement).clientHeight+'px':'auto'}]`}>
      {JSON.stringify(datePicker.current?(datePicker?.current as HTMLElement).clientHeight:"")}
      </div>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        alwaysOpen={true}
        ref={datePicker}
      ></DatePicker>
    </div>
  );
}

export default Todo;
