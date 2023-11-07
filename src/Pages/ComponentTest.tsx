import DatePicker from "@/Components/DatePicker";
import moment from "moment";
import { U_DATE_FORMAT } from "../Constant";
import Button from "@/Components/Button/index";
import Input from "@/Components/Input";
import StatusInput from "@/Components/Input/StatusInput";
import { ChangeEvent, useCallback, useState } from "react";
import useReducer from "@/Hooks/useReducer";
import { useSelector } from "react-redux";
import { ReducerType } from "@/Types/store";
import CheckBox from "@/Components/Input/CheckBox";
import DragNDrop from "@/Components/DragNDrop";

function ComponentTest() {
  const { setPopup } = useReducer();
  const [text, setText] = useState("");
  const [chkV, setChkV] = useState<boolean>(false);
  const [date1, setDate1] = useState<any>(moment().format(U_DATE_FORMAT));
  const [date2, setDate2] = useState<any>(moment().format(U_DATE_FORMAT));
  const [itemList, setItemList] = useState([
    { content: "아이템1" },
    { content: "아이템2" },
    { content: "아이템3" },
    { content: "아이템4" },
  ]);
  const onButtonClick = useCallback(() => {
    alert("onButtonClick");
  }, []);

  const onCheckBoxClick = useCallback(
    (e) =>
      // alert((e.target as HTMLInputElement).checked);
      setChkV((v) => {
        v = (e.target as HTMLInputElement).checked;
        alert(v + "vv");
        return v;
      }),
    // },
    []
  );

  return (
    <div>
      <ul>
        <li>
          <Button onClick={onButtonClick} isDebouncedButton={true}>
            버튼 클릭
          </Button>
        </li>

        <li>
          인풋{text}
          <Input
            type="text"
            placeholder="search..."
            value={text}
            onChange={(e: ChangeEvent) =>
              setText((e.target as HTMLInputElement).value)
            }
          />
        </li>

        <li>
          스테이터스인풋{text}
          <StatusInput
            type="text"
            placeholder="search..."
            value={text}
            onChange={(e: ChangeEvent) => {
              console.log(e, "eeee");
              setText(e.target ? (e.target as HTMLInputElement).value : "");
            }}
          />
        </li>

        <li>
          <p>달력</p>
          날짜 <br />
          date1 : {date1}
          <br />
          date2 : {date2}
          <br />
          <br />
          <DatePicker
            selectedDate={date1}
            onChange={(d) =>
              setDate1((A: any) => {
                return moment(d).format(U_DATE_FORMAT);
              })
            }
          />
          <br />
          <br />
          <DatePicker
            selectedDate={date2}
            setSelectedDate={setDate2}
            alwaysOpen={false}
          />
        </li>
        <li>
          <Button
            onClick={() =>
              setPopup("팝업", { Confirm: () => {}, Cancel: () => {} })
            }
          >
            팝업
          </Button>
        </li>
        <li>
          <CheckBox onChange={onCheckBoxClick} value={chkV} />
        </li>
        <li>
          <p>드레그앤드랍</p>
          <DragNDrop itemList={itemList} setItemList={setItemList} />
        </li>
      </ul>
    </div>
  );
}

export default ComponentTest;
