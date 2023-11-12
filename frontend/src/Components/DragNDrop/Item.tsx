import CheckBox from "@/Components/Input/CheckBox";
import { DragNDropItemType } from "@/Types/index";
import StatusInput from "../Input/StatusInput";

function Item({
  index,
  contentId,
  content,
  setContent,
  cotentClassName,
  checkboxReadonly = false,
  contentReadonly = false,
}: DragNDropItemType) {
  return (
    <>
      <span>
        <CheckBox value={contentId} readonly={checkboxReadonly} />
      </span>
      <span className="flex grow items-center">
        <StatusInput readonly={contentReadonly} className={cotentClassName} value={content} onChange={e=>setContent((e.target as HTMLInputElement).value)}/>
        {content}
      </span>
    </>
  );
}

export default Item;
