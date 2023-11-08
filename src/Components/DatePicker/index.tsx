import { SyntheticEvent } from "react";
import _DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { getYear, getMonth } from "date-fns";
import _ from "lodash";
import "./index.css";

import { DATE_FORMAT, U_DATE_FORMAT } from "@/Constant/index";
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
  const years = _.range(1990, getYear(new Date()) + 1, 1); // 수정
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
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
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              width: "100%",
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <ul
            // value={getYear(date)}
            // onChange={({ target: { value } }) => changeYear(+value)}
            >
              {years.map((option) => (
                <li
                  key={option}
                  value={getYear(date)}
                  onClick={(e) => changeYear(+option)}
                >
                  {option}
                </li>
              ))}
            </ul>

            <ul
              // value={months[getMonth(date)]}
              // onChange={({ target: { value } }) =>
              //   changeMonth(months.indexOf(value))
              // }
            >
              {months.map((option) => (
                <li
                  key={option}
                  value={months[getMonth(date)]}
                  onClick={(e) => changeMonth(months.indexOf(option))}
                >
                  {option}
                </li>
              ))}
            </ul>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
      />
    </div>
  );
}

export default DatePicker;
