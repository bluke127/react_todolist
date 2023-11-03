import { SyntheticEvent } from "react";
import _DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
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
  const handleOnChangeFunc = (d: Date, e: SyntheticEvent<any, Event>) => {
    onChange
      ? onChange(d, e)
      : setSelectedDate(() => {
          return moment(d).format(U_DATE_FORMAT);
        });
  };
  return (
    <div>
      <_DatePicker
        locale={ko}
        open={alwaysOpen||undefined}
        dateFormat={dateFormat} // 날짜 형태
        shouldCloseOnSelect={!alwaysOpen} // 날짜를 선택하면 datepicker가 자동으로 닫힘
        minDate={minDate} // minDate 이전 날짜 선택 불가
        maxDate={maxDate} // maxDate 이후 날짜 선택 불가
        selected={new Date(selectedDate)}
        onChange={handleOnChangeFunc}
      />
    </div>
  );
}

export default DatePicker;
