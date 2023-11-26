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
import { ShowModal, CloseModal } from "@/Store/reducers/modal";
import useReducer from "./../Hooks/useReducer";
import { MdAutoFixOff, MdAutoFixNormal } from "react-icons/md";
import Routine from "./Routine";
import useEventListener from "./../Hooks/useEventListener";

export function Todo() {
  const id = useId(); //아이디
  const { setPopup } = useReducer(); //팝업 세팅
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const datePicker = useRef(); //달력
  const datePickerWrappper = useRef(null);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [isFixDatePicker, setIsFixDatePicker] = useState(true);
  const [fixing, setFixing] = useState(true); //focusout할때 고정이미지에 클릭시에도 focusout으로 인식, 방지 플레그
  const [selectedDate, setSelectedDate] = useState<any>(
    moment().format(U_DATE_FORMAT)
  ); //날짜
  const [planList, setPlanList] = useState([]);
  const [routinueList, setRoutinueList] = useState([]);
  const [insertValue, setInsertValue] = useState("");
  let closeDatePicker = (e) => {
    console.log("????", e);
    if (!isFixDatePicker&& !fixing) setIsShowDatePicker(false);
  };
  //추가
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
  //저장
  const onSaveTodoList = useCallback(() => {
    localStorage.setItem(selectedDate, JSON.stringify(planList));
    setPopup("저장되었습니다");
  }, [planList, insertValue]);
  //요일별 루틴에서 모달띄우기
  const handleShowModal = useCallback((e) => {
    dispatch(ShowModal(id));
  }, []);
  //요일별 루틴 모달을 닫고 실행시킬함수
  const handleCloseModal = useCallback((e) => {
    dispatch(CloseModal(id));
    changeDate(selectedDate);
  }, []);
  //날짜 변경
  const changeDate = useCallback((d) => {
    let _d = moment(d).format(U_DATE_FORMAT);
    setSelectedDate(_d);
  }, []);
  //요일
  const selectedDay = useMemo(
    () => DAYS[moment(new Date(selectedDate)).day()],
    [selectedDate]
  );
  useEffect(() => {
    let dayRoutine = JSON.parse(localStorage.getItem(selectedDay));
    let todo = JSON.parse(localStorage.getItem(selectedDate));
    let arr = [];
    if (dayRoutine) {
      setRoutinueList((arr) => [...dayRoutine]);
      arr.push(...dayRoutine);
    }
    if (todo) {
      arr.push(...todo);
    }
    setPlanList((_) => [...arr]);
    if (!isFixDatePicker) setIsShowDatePicker(false);
  }, [selectedDate]);
  useEffect(() => {
    changeDate(selectedDate);
    console.log(datePickerWrappper);
  }, []);

  const [cntForId, setCntId] = useState(0);
  useEventListener("focusout", closeDatePicker, datePickerWrappper.current);
  return (
    <div className="red w-full h-full rounded border-solid border-2 border-indigo-600 overflow-y-scroll">
      <Modal id={id} wrapperClassName={"w-3/4 h-4/5"}>
        <Routine
          day={selectedDay}
          planList={routinueList}
          setPlanList={setRoutinueList}
          closeModal={handleCloseModal}
        ></Routine>
      </Modal>
      <div className="relative my-4 p-3 text-center">
        <div
          className="text-xl  justify-center content-center font-black"
          onClick={(_) => setIsShowDatePicker(true)}
        >
          {`${selectedDate} (${selectedDay})`}
        </div>
        <div className="absolute top-0 right-2">
          <Button
            className="p-3  ml-2 bg-emerald-200 inline"
            onClick={handleShowModal}
          >
            요일별 루틴
          </Button>
          <Button
            onClick={onSaveTodoList}
            className="p-3  ml-2  bg-emerald-200 inline"
          >
            저장
          </Button>
        </div>
      </div>
      {isShowDatePicker + "ss"}
      <div
        ref={datePickerWrappper}
        className={`${isShowDatePicker ? "" : "hidden"}`}
      >
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          ref={datePicker}
          alwaysOpen={true}
          customInput={
            <div>
              <div
                onClick={(_) => {
                  _.preventDefault();
                  _.stopPropagation();
                  setIsFixDatePicker((v) => !v);
                }}
                onMouseEnter={(_) => setFixing(true)}
                onMouseLeave={(_) => setFixing(false)}
              >
                {isFixDatePicker ? <MdAutoFixNormal /> : <MdAutoFixOff />}
              </div>
            </div>
          }
          onChange={changeDate}
        ></DatePicker>
      </div>
      <DragNDrop
        contentList={planList}
        setContentList={setPlanList}
        cotentClassName={"w-full h-full"}
        wrapperClassName={"h-full"}
      ></DragNDrop>
      <Input
        value={insertValue}
        onChange={(e) => setInsertValue((e.target as HTMLInputElement).value)}
      />
      <Button onClick={onAddTodoList} className="p-3  my-4 ml-2 bg-emerald-200">
        추가
      </Button>
    </div>
  );
}

export default Todo;
