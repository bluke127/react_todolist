import DragNDrop from "@/Components/DragNDrop";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DAYS } from "@/Constant/index";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import useReducer from "@/Hooks/useReducer";
import { DragNDropItemType } from "../Types";
import { useRoutineApi } from "@/Services/RoutineApi";
function Routine({
  day,
  planList,
  setPlanList,
  closeModal,
}: {
  day: string;
  planList: DragNDropItemType[];
  setPlanList: Dispatch<SetStateAction<DragNDropItemType[]>>;
  closeModal: Function;
}) {
  const [insertValue, setInsertValue] = useState("");
  const { getRoutineApi, postRoutineApi } = useRoutineApi();
  const { setPopup, closePopup } = useReducer();
  const [routineDay, setRoutineDay] = useState(day);
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

  const onSaveTodoList = useCallback(async () => {
    try {
      setPlanList((arr) => [...arr]);
      // localStorage.setItem(day, JSON.stringify(planList));
      await postRoutineApi({
        data: planList.map((todo) => {
          return {
            contentId: todo.contentId,
            content: todo.content,
            checked: todo.checked,
            day: day,
          };
        }),
      });
      setPopup("저장되었습니다", {
        Confirm: () => {
          closeModal();
        },
      });
    } catch (e) {
      console.log(e);
    }
  }, [planList, insertValue]);
  const onSelect = useCallback(async (day: string) => {
    try {
      setRoutineDay(day);
      // let r = JSON.parse(localStorage.getItem(day) as string);
      let _r = await getRoutineApi(day);
      let r = _r.data.content;
      r = r.map((item) => {
        return { ...item, checked: false };
      });
      if (r && r.length) {
        setPlanList(() => [...r]);
      } else {
        setPlanList(() => []);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    onSelect(routineDay);
  }, [routineDay]);
  return (
    <div className="w-4/5 h-4/5 flex flex-col">
      <div className="flex justify-end">
        <Button
          onClick={onSaveTodoList}
          className="px-3 py-1 my-4 bg-emerald-200 rounded"
        >
          저장
        </Button>
      </div>
      <div className="flex">
        {DAYS.map((dayItem) => (
          <div
            className={
              "flex-1 text-center rounded-md " +
              `${
                routineDay === dayItem
                  ? "bg-gray-900 text-white"
                  : "bg-gray-400"
              }`
            }
            onClick={() => onSelect(dayItem)}
          >
            <div className="w-full">{dayItem}</div>
          </div>
        ))}
      </div>
      <div className="grow">
        <DragNDrop
          contentList={planList}
          setContentList={setPlanList}
          wrapperClassName={"h-full"}
          cotentClassName={"w-full"}
          checkboxReadonly={true}
        ></DragNDrop>
      </div>
      <div className="border-black border-2 box-border">
        <div>
          <span className="text-red-400">TODO</span>

          <Input
            value={insertValue}
            onChange={(e) =>
              setInsertValue((e.target as HTMLInputElement).value)
            }
          />
        </div>

        <div className="m-2 my-4">
          <Button
            onClick={onAddTodoList}
            className="w-full my-4 bg-emerald-200"
          >
            추가
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Routine;
