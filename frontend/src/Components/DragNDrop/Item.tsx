import CheckBox from "@/Components/Input/CheckBox";
import { DragNDropItemType } from "@/Types/index";
import StatusInput from "../Input/StatusInput";

function Item({
  index,
  value,
  content,
  cotentClassName,
  checkboxReadonly = false,
  contentReadonly = false,
}: DragNDropItemType) {
  return (
    <>
      <span>
        <CheckBox value={value} readonly={checkboxReadonly} />
      </span>
      <span className="flex grow items-center">
        <StatusInput readonly={contentReadonly} className={cotentClassName} />
        {content}
      </span>
    </>
  );
}

export default Item;
