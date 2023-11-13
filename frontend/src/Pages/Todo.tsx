import { useEffect, useCallback, useRef, useState } from "react";
import DatePicker from "@/Components/DatePicker";
import { U_DATE_FORMAT } from "../Constant";
import moment from "moment";
import DragNDrop from "@/Components/DragNDrop";
import Button from "@/Components/Button";
import Input from "@/Components/Input";

export function Todo() {
  const [selectedDate, setSelectedDate] = useState<any>(
    moment().format(U_DATE_FORMAT)
  );
  const datePicker = useRef();
  const [planList, setPlanList] = useState([]);
  const [insertValue, setInsertValue] = useState("");
  const [cntForId, setCntId] = useState(0);
  const onAddTodoList = useCallback(() => {
    let saveData = [...planList];
    if (insertValue) {
      saveData.push({
        content: insertValue,
        contentId: cntForId,
        checked: false,
      });
    }
    setPlanList((arr) => {
      return [...saveData];
    });
    setCntId(cntForId + 1);
    setInsertValue("");
  }, [planList, insertValue]);
  return (
    <div className="red w-full h-full rounded border-solid border-2 border-indigo-600 overflow-y-scroll">
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        alwaysOpen={true}
        ref={datePicker}
      ></DatePicker>
      {JSON.stringify(planList)}
      <DragNDrop
        contentList={planList}
        setContentList={setPlanList}
        cotentClassName={"w-full"}
      ></DragNDrop>
      <Input
        value={insertValue}
        onChange={(e) => setInsertValue((e.target as HTMLInputElement).value)}
      />
      <Button onClick={onAddTodoList} className="w-full my-4 bg-emerald-200">
        저장
      </Button>
    </div>
  );
}

export default Todo;
