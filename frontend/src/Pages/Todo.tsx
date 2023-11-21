import { useEffect, useCallback, useRef, useState, useMemo } from "react";
import DatePicker from "@/Components/DatePicker";
import { DAYS, U_DATE_FORMAT } from "../Constant";
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
  const onSaveTodoList = useCallback(() => {
    localStorage.setItem(selectedDate, JSON.stringify(planList));
  }, [planList, insertValue]);
  const selectDay=useMemo(()=>DAYS[moment(new Date(selectedDate)).day()],[selectedDate])
  return (
    <div className="red w-full h-full rounded border-solid border-2 border-indigo-600 overflow-y-scroll">
      <div><Button>요일별 루틴</Button></div>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        ref={datePicker}
        alwaysOpen={true}
        customInput={<div  className="w-full">{`${selectedDate} (${selectDay})`}</div>}
        ></DatePicker>
      <DragNDrop
        contentList={planList}
        setContentList={setPlanList}
        cotentClassName={"w-full"}
      ></DragNDrop>
      {insertValue + "insertValue"}
      <Input
        value={insertValue}
        onChange={(e) => setInsertValue((e.target as HTMLInputElement).value)}
      />
      <Button onClick={onAddTodoList} className="w-full my-4 bg-emerald-200">
        추가
      </Button>
      <Button onClick={onSaveTodoList} className="w-full my-4 bg-emerald-200">
        저장
      </Button>
    </div>
  );
}

export default Todo;
