//각 날짜에 따라 todo를 지정할 수 있고
//특이 사항으로 routine이라는 걸 설정할 수 있음
//설정하면 요일별로 루틴이 오늘을 기준으로 미래의 요일에 동일하게 적용됨
import {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useId,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from "react";
import DatePicker from "@/Components/DatePicker";
import { DAYS, U_DATE_FORMAT } from "@/Constant";
import moment from "moment";
import DragNDrop from "@/Components/DragNDrop";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { ShowModal, CloseModal } from "@/Store/reducers/modal";
import useReducer from "@/Hooks/useReducer";
import Routine from "@/Pages/Routine";
import { DragNDropItemType, PlanType } from "@/Types/index";
import { useTodoApi } from "@/Services/TodoApi";
import { useRoutineApi } from "@/Services/RoutineApi";

export function Todo() {
  const id = useId(); //아이디
  const { setPopup } = useReducer(); //팝업 세팅
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const { getTodoApi, postTodoApi } = useTodoApi();//todo 세팅
  const { getRoutineApi, postRoutineApi } = useRoutineApi();//루틴 세팅
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format(U_DATE_FORMAT)
  ); //날짜

  const [planList, setPlanList]: [
    PlanType[],
    Dispatch<SetStateAction<PlanType[]>>
  ] = useState<PlanType[]>([]);
  const [routinueList, setRoutinueList]: [
    PlanType[],
    Dispatch<SetStateAction<PlanType[]>>
  ] = useState<PlanType[]>([]);

  const [insertValue, setInsertValue]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");//추가 todo
  //추가
  const onAddTodoList = useCallback(() => {
    let saveData: PlanType[] = [...planList];
    let insertData: DragNDropItemType = {
      content: insertValue,
      contentId: cntForId,
      checked: false,
    };
    if (insertValue) {
      saveData.push(insertData);
    }
    setPlanList((arr: PlanType[]) => {
      return [...saveData];
    });
    //할당해줄 id
    setCntId(cntForId + 1);
    setInsertValue("");
  }, [planList, insertValue]);
  //저장
  const onSaveTodoList = useCallback(async () => {
    try {
      await postTodoApi({
        data: !planList.length
          ? selectedDate
          : planList.map((todo) => {
              return {
                contentId: todo.contentId,
                content: todo.content,
                checked: todo.checked,
                date: selectedDate,
                routineId: todo.routineId, //루틴 id
              };
            }),
      });
      setPopup("저장되었습니다");
    } catch (e: any) {
      // console.log(e);
      setPopup(e.message);
    }
  }, [planList, insertValue]);
  //요일별 루틴에서 모달띄우기
  const handleShowModal = useCallback(async () => {
    try {
      let _r = await getRoutineApi(selectedDay);
      let r = _r.data.content;
      //루틴에 대한 data있으면?
      if (r && r.length) {
        setRoutinueList((arr) => [...r]);
      } else {
        setRoutinueList((_) => []);
      }
      dispatch(ShowModal(id));
    } catch (e) {
      console.log(e);
    }
  }, [selectedDate]);
  //요일별 루틴 모달을 닫고 실행시킬함수
  const handleCloseModal = useCallback((d: Date) => {
    dispatch(CloseModal(id));
    changeDate(new Date(selectedDate));
    setRoutine();
  }, []);
  //날짜 변경
  const changeDate = useCallback((d: Date, e?: SyntheticEvent<any, Event>) => {
    let _d = moment(d).format(U_DATE_FORMAT);
    setSelectedDate(_d);
    setIsShowDatePicker(false);
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
  }, []);

  const [cntForId, setCntId] = useState(0);
  //루틴 세팅
  const setRoutine = useCallback(async () => {
    try {
      let _dayRoutine = await getRoutineApi(selectedDay);
      let _todo = await getTodoApi(selectedDate);
      let todo: PlanType[] = _todo.data.content;
      let dayRoutine: PlanType[] = _dayRoutine.data.content;
      let arr: PlanType[] = [];
      let today = moment(new Date()).format("YYYY-MM-DD");
      //오늘이후로 적용
      if (
        new Date(today).getTime() <= new Date(selectedDate).getTime() &&
        dayRoutine
      ) {
        //content에서 rotine의 id가 포함된거는 중복임으로 다시 보여주지 않는 필터 작업
        let todoRoutineId = todo.map((v) => v.routineId);
        dayRoutine = dayRoutine
          .map((v) => {
            if (!todoRoutineId.includes(v.contentId as number)) {
              return v;
            }
          })
          .filter((v) => v) as PlanType[];
        setRoutinueList((arr) => [...dayRoutine]);
        arr.push(
          ...(dayRoutine.map((obj) => {
            return { ...obj, routineId: obj.contentId };
          }) as PlanType[])
        );
      }
      if (todo) {
        arr.push(...(todo as PlanType[]));
      }
      setPlanList((_) => [...arr]);
      setIsShowDatePicker(false);
    } catch (e) {
      console.log(e);
    }
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
                onSelect={changeDate}
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
