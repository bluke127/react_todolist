import Button from "@/Components/Button/index";
import DatePicker from "@/Components/DatePicker";
import moment from "moment";
import { useCallback, useState } from "react";
import { U_DATE_FORMAT } from "../Constant";
function ComponentTest() {
  const onButtonClick = useCallback(() => {
    alert("onButtonClick");
  }, []);
  const [date1, setDate1] = useState<any>(moment().format(U_DATE_FORMAT));
  const [date2, setDate2] = useState<any>(moment().format(U_DATE_FORMAT));
  return (
    <>
      <div>
        <ul>
          <li>
            <Button onClick={onButtonClick} isDebouncedButton={true}>
              버튼 클릭
            </Button>
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
            <DatePicker selectedDate={date2} setSelectedDate={setDate2} shouldCloseOnSelect={false}/>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ComponentTest;
