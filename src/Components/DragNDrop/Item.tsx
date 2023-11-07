import CheckBox from "@/Components/Input/CheckBox";

function Item({ index, value, content }) {
  return (
    <div key={index}>
      <span>
        <CheckBox value={value} />
      </span>
      <span>{content}</span>
    </div>
  );
}

export default Item;
