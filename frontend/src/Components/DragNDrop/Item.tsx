import CheckBox from "@/Components/Input/CheckBox";

function Item({ index, value, content }) {
  return (
    <>
      <span>
        <CheckBox value={value} />
      </span>
      <span>{content}</span>
    </>
  );
}

export default Item;
