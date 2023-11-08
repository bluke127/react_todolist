import { useState } from "react";
import DatePicker from "@/Components/DatePicker";
import { U_DATE_FORMAT } from "../Constant";
import moment from "moment";

export function Todo() {
  const [selectedDate, setSelectedDate] = useState<any>(
    moment().format(U_DATE_FORMAT)
  );
  return (
    <div className="red w-full h-full rounded border-solid border-2 border-indigo-600">
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        alwaysOpen={true}
      ></DatePicker>
    </div>
  );
}

export default Todo;
