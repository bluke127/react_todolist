import { ForwardedRef, LegacyRef, ReactNode, SyntheticEvent } from "react";
import _DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { getYear, getMonth } from "date-fns";
import _ from "lodash";
import "./index.css";

import { DATE_FORMAT, U_DATE_FORMAT } from "@/Constant/index";
import Button from "../Button";
import { DateType } from "@/Types/index";
type PropType = DateType;
const DatePicker = ((props: PropType, ref: ForwardedRef<HTMLElement>) => {
  let {
    onChange,
    minDate,
    maxDate,
    selectedDate,
    setSelectedDate,
    dateFormat = DATE_FORMAT as string,
    alwaysOpen = false,
    popperClassName = "",
    customInput,
    className = "",
  } = props;
  const YEARS = Array.from(
    { length: getYear(new Date()) + 1 - 2000 },
    (_, i) => getYear(new Date()) - i
  );

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleOnChangeFunc = (d: Date, e: SyntheticEvent<any, Event>) => {
    //날짜 선택시에 함수 있으면 그거 사용
    //아니면 그냥 날짜 변경
    onChange && !setSelectedDate
      ? onChange(d, e)
      : setSelectedDate!(() => {
          return moment(d).format(U_DATE_FORMAT);
        });
  };
  return (
    <div className="w-full h-full">
      <_DatePicker
        locale={ko}
        showPopperArrow={false}
        open={alwaysOpen || undefined}
        className={"w-full"}
        dateFormat={dateFormat} // 날짜 형태
        shouldCloseOnSelect={!alwaysOpen} // 날짜를 선택하면 datepicker가 자동으로 닫힘
        minDate={minDate} // minDate 이전 날짜 선택 불가
        maxDate={maxDate} // maxDate 이후 날짜 선택 불가
        selected={new Date(selectedDate as string)}
        onChange={handleOnChangeFunc}
        popperClassName={popperClassName + alwaysOpen ? "always_open" : ""}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div className="flex justify-between items-center h-full py-1 px-5">
            <div className="basis-1/2 flex">
              <span className="basis-1/2">{MONTHS[getMonth(date)]}</span>
              <select
                value={getYear(date)}
                className="basis-1/2 "
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="basis-1/3 flex justify-around">
              <Button onClick={decreaseMonth} className="monthButton">
                &lt;
              </Button>
              <Button onClick={increaseMonth} className="monthButton">
                &gt;
              </Button>
            </div>
          </div>
        )}
        customInput={customInput}
      />
    </div>
  );
});
export default DatePicker;
