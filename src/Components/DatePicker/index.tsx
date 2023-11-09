import { SyntheticEvent } from "react";
import _DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { getYear, getMonth } from "date-fns";
import _ from "lodash";
import "./index.css";

import { DATE_FORMAT, U_DATE_FORMAT } from "@/Constant/index";
import Button from "../Button";
type PropType = {
  onChange?: (date: Date, event: SyntheticEvent<any, Event>) => void;
  selectedDate: Date | null;
  setSelectedDate?: Function;
  dateFormat?: string;
  minDate?: null | Date;
  maxDate?: null | Date;
  alwaysOpen?: boolean;
};
function DatePicker({
  onChange,
  minDate,
  maxDate,
  selectedDate,
  setSelectedDate,
  dateFormat = DATE_FORMAT as string,
  alwaysOpen = false,
}: PropType) {
  const YEARS = Array.from({ length: getYear(new Date()) + 1 - 2000 }, (_, i) => getYear(new Date()) - i);


  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleOnChangeFunc = (d: Date, e: SyntheticEvent<any, Event>) => {
    onChange
      ? onChange(d, e)
      : setSelectedDate(() => {
          return moment(d).format(U_DATE_FORMAT);
        });
  };
  return (
    <div className="w-full relative">
      <_DatePicker
        locale={ko}
        open={alwaysOpen || undefined}
        className="w-full"
        dateFormat={dateFormat} // 날짜 형태
        shouldCloseOnSelect={!alwaysOpen} // 날짜를 선택하면 datepicker가 자동으로 닫힘
        minDate={minDate} // minDate 이전 날짜 선택 불가
        maxDate={maxDate} // maxDate 이후 날짜 선택 불가
        selected={new Date(selectedDate)}
        onChange={handleOnChangeFunc}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="customHeaderContainer">
            <div className="month_wrap">
              <span className="month">{MONTHS[getMonth(date)]}</span>
              <select
                value={getYear(date)}
                className="year"
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div >
              <Button
                onClick={decreaseMonth}
                className="monthButton"
              >
                &lt;
              </Button>
              <Button
                onClick={increaseMonth}
                className="monthButton"
              >
                &gt;
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default DatePicker;
