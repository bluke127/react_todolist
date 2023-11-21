import {
  useEffect,
  useCallback,
  useRef,
  useState,
  useMemo,
  useId,
  Dispatch,
} from "react";
import DatePicker from "@/Components/DatePicker";
import { DAYS, U_DATE_FORMAT } from "../Constant";
import moment from "moment";
import DragNDrop from "@/Components/DragNDrop";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { ShowModal } from "@/Store/reducers/modal";
import useReducer from "./../Hooks/useReducer";

export function Todo() {
  const id = useId();
  const { setPopup } = useReducer();
  const [selectedDate, setSelectedDate] = useState<any>(
    moment().format(U_DATE_FORMAT)
  );
  const datePicker = useRef();
  const dispatch: Dispatch<AnyAction> = useDispatch();
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
    setPopup("저장되었습니다");
  }, [planList, insertValue]);
  const handleShowModal = useCallback((e) => {
    alert(id);
    dispatch(ShowModal(id));
  }, []);
  const changeDate = useCallback((d)=>{
    let _d = moment(d).format(U_DATE_FORMAT)
    setSelectedDate(_d)
    let todo = localStorage.getItem(_d)
    console.log(_d,todo,"eeeeeee")
    if(todo){
      setPlanList((arr)=>[...JSON.parse(todo)])
    } else{
      setPlanList((arr)=>[])
    }
  },[])
  const selectDay = useMemo(
    () => DAYS[moment(new Date(selectedDate)).day()],
    [selectedDate]
  );
  useEffect(()=>{
    changeDate(selectedDate)
  },[])
  return (
    <div className="red w-full h-full rounded border-solid border-2 border-indigo-600 overflow-y-scroll">
      <Modal id={id}>sss</Modal>
      <div>
        <Button
          className="w-full my-4 bg-emerald-200"
          onClick={handleShowModal}
        >
          요일별 루틴
        </Button>
      </div>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        ref={datePicker}
        alwaysOpen={true}
        customInput={
          <div className="w-full">{`${selectedDate} (${selectDay})`}</div>
        }
        onChange={changeDate}
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
