import DragNDrop from "@/Components/DragNDrop";
import { Dispatch, useCallback, useState } from "react";
import { DAYS } from "../Constant";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import useReducer from "@/Hooks/useReducer";
import { ClosePopup } from "@/Store/reducers/popup";
import { AnyAction } from "redux";
function Routine({ day, planList, setPlanList, closeModal }) {
  const [insertValue, setInsertValue] = useState("");
  const { setPopup, closePopup } = useReducer();
  const [routineDay,setRoutineDay]=useState(day)
  const onAddTodoList = useCallback(() => {
    let saveData = [...planList];
    if (insertValue) {
      saveData.push({
        content: insertValue,
        contentId: `routinue_${day}`,
        checked: false,
      });
    }
    setPlanList((arr) => {
      return [...saveData];
    });
    setInsertValue("");
  }, [planList, insertValue]);

  const onSaveTodoList = useCallback(() => {
    setPlanList((arr) => [...arr]);
    localStorage.setItem(day, JSON.stringify(planList));
    setPopup("저장되었습니다", {
      Confirm: () => {
        closeModal()
      },
    });
  }, [planList, insertValue]);
  const onClickDay=(day)=>{
    setRoutineDay(day)
    let r=JSON.parse(localStorage.getItem(day))
    if(r&&r.length){
      setPlanList(arr=>[...r])
    }else{
      
      setPlanList(_=>[])
    }
  }
  return (
    <div className="w-4/5">
      <div className="flex">
        {DAYS.map((dayItem) => (
          <div
            className={
              "flex-1 text-center rounded-md " +
              `${routineDay === dayItem ? "bg-gray-900 text-white" : "bg-gray-400"}`
            }
            onClick={()=>onClickDay(dayItem)}
          >
            <div className="w-full">{dayItem}</div>
          </div>
        ))}
      </div>
      <DragNDrop
        contentList={planList}
        setContentList={setPlanList}
        cotentClassName={"w-full"}
        checkboxReadonly={true}
      ></DragNDrop>

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
export default Routine;
