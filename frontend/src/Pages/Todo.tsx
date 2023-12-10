import {
  useEffect,
  useCallback,
  useRef,
  useState,
  useMemo,
  useId,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
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
import { DragNDropItemType } from "@/Types/index";

export function Todo() {
  const id = useId(); //아이디
  const { setPopup } = useReducer(); //팝업 세팅
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const datePicker = useRef(); //달력
  const datePickerWrappper = useRef(null);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format(U_DATE_FORMAT)
  ); //날짜
  const [planList, setPlanList]: [
    DragNDropItemType[],
    Dispatch<SetStateAction<DragNDropItemType[]>>
  ] = useState<DragNDropItemType[]>([]);
  const [routinueList, setRoutinueList]: [
    DragNDropItemType[],
    Dispatch<SetStateAction<DragNDropItemType[]>>
  ] = useState<DragNDropItemType[]>([]);

  const [insertValue, setInsertValue]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  //추가
  const onAddTodoList = useCallback(() => {
    let saveData: DragNDropItemType[] = [...planList];
    let insertData: DragNDropItemType = {
      content: insertValue,
      contentId: cntForId,
      checked: false,
    };
    if (insertValue) {
      saveData.push(insertData);
    }
    setPlanList(() => {
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
  const handleShowModal = useCallback(() => {
    let r = JSON.parse(localStorage.getItem(selectedDate) as string);
    if (r && r.length) {
      setPlanList((arr) => [...r]);
    } else {
      setPlanList((_) => []);
    }
    dispatch(ShowModal(id));
  }, [selectedDate]);
  //요일별 루틴 모달을 닫고 실행시킬함수
  const handleCloseModal = useCallback((d:Date) => {
    dispatch(CloseModal(id));
    changeDate(new Date(selectedDate));
    setRoutine();
  }, []);
  //날짜 변경
  const changeDate = useCallback((d:Date,e?: SyntheticEvent<any, Event>) => {
    let _d = moment(d).format(U_DATE_FORMAT);
    setSelectedDate(_d);
  }, []);
  //요일
  const selectedDay = useMemo(
    () => DAYS[moment(new Date(selectedDate)).day()],
    [selectedDate]
  );
  useEffect(() => {
    setRoutine();
  }, [selectedDate]);
  useEffect(() => {
    changeDate(new Date(selectedDate));
    console.log(datePickerWrappper);
  }, []);

  const [cntForId, setCntId] = useState(0);
  const setRoutine = useCallback(() => {
    let dayRoutine = JSON.parse(localStorage.getItem(selectedDay) as string);
    let todo = JSON.parse(localStorage.getItem(selectedDate) as string);
    let arr: DragNDropItemType[] = [];
    let today = moment(new Date()).format("YYYY-MM-DD");
    if (
      new Date(today).getTime() <= new Date(selectedDate).getTime() &&
      dayRoutine
    ) {
      setRoutinueList((arr) => [...dayRoutine]);
      arr.push(...dayRoutine);
    }
    if (todo) {
      arr.push(...todo);
    }
    setPlanList((_) => [...arr]);
    setIsShowDatePicker(false);
  }, [selectedDay, selectedDate]);
  return (
    <div className="red w-full h-full flex-col flex">
      <Modal id={id} wrapperClassName={"w-3/4 h-4/5"}>
        <Routine
          day={selectedDay}
          planList={routinueList}
          setPlanList={setRoutinueList}
          closeModal={handleCloseModal}
        ></Routine>
      </Modal>
      <div className="my-4 p-3 text-center flex md:flex-col sm:flex-col">
        <div className="basis-1/4  md:hidden sm:hidden"></div>
        <div
          className="text-xl grow justify-center content-center font-black"
          onClick={(_) => setIsShowDatePicker(true)}
        >
          {`${selectedDate} (${selectedDay})`}
        </div>
        <div className="basis-1/4">
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
      <div className="grow">
        <div className={`w-full h-full relative z-10`}>
          {isShowDatePicker ? (
            <div
              className={
                "w-full absolute top-0 bg-[#F0F0F0] overflow-hidden z-10 no_input"
              }
            >
              <DatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                alwaysOpen={isShowDatePicker}
                customInput={<div></div>}
                onChange={changeDate}
              ></DatePicker>
            </div>
          ) : (
            <></>
          )}
          <DragNDrop
            contentList={planList}
            setContentList={setPlanList}
            cotentClassName={"w-full h-full"}
            wrapperClassName={"h-full"}
            emptyMessage={"할일을 추가해주세요"}
          ></DragNDrop>
        </div>
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
          <Button onClick={onAddTodoList} className="w-full p-3 bg-emerald-200">
            추가
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
