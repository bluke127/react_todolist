import CheckBox from "@/Components/Input/CheckBox";
import { DragNDropAttrType, DragNDropItemType } from "@/Types/index";
import StatusInput from "../Input/StatusInput";

function Item({
  item,
  setItem,
  cotentClassName,
  checkboxReadonly = false,
  contentReadonly = false,
  readOnly = false,
}: { item: DragNDropItemType; setItem: any } & DragNDropAttrType) {
  return (
    <>
      {readOnly ? null : (
        <CheckBox
          value={item.contentId ?? ""}
          readonly={checkboxReadonly}
          checked={item.checked}
          onChange={(e) => {
            setItem((e.target as HTMLInputElement).checked, "checked");
          }}
        />
      )}
      <span className="flex grow items-center">
        <StatusInput
          readonly={contentReadonly}
          className={cotentClassName + `${item.checked && " line-through"}`}
          value={item.content}
          onChange={(e) => {
            setItem((e.target as HTMLInputElement).value, "content");
          }}
        />
      </span>
    </>
  );
}

export default Item;
