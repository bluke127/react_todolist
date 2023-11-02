import DatePicker from "@/Components/DatePicker";
import moment from "moment";
import { U_DATE_FORMAT } from "../Constant";
import Button from "@/Components/Button/index";
import Input from "@/Components/Input";
import StatusInput from "@/Components/Input/StatusInput";
import { ChangeEvent, useCallback, useState } from "react";

function ComponentTest() {
  const [text, setText] = useState("");
  const [date1, setDate1] = useState<any>(moment().format(U_DATE_FORMAT));
  const [date2, setDate2] = useState<any>(moment().format(U_DATE_FORMAT));
  const onButtonClick = useCallback(() => {
    alert("onButtonClick");
  }, []);

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
            onChange={(e: ChangeEvent) =>
              setText((e.target as HTMLInputElement).value)
            }
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
      </ul>
    </div>
  );
}

export default ComponentTest;
