import Button from "@/Components/Button/index";
import Input from "@/Components/Input";
import StatusInput from "@/Components/Input/StatusInput";
import { ChangeEvent, useCallback, useState } from "react";

function ComponentTest() {
  const [text, setText] = useState("");
  const onButtonClick = useCallback(() => {
    alert("onButtonClick");
  }, []);

  return (
    <div>
      <ul>
        <li>
          <Button onClick={onButtonClick} isDebouncedButton={true}>
            버튼 클릭
          </Button>
        </li>

        <li>
          인풋{text}
          <Input
            type="text"
            placeholder="search..."
            value={text}
            onChange={(e: ChangeEvent) =>
              setText((e.target as HTMLInputElement).value)
            }
          />
        </li>
        
        <li>
          스테이터스인풋{text}
          <StatusInput
            type="text"
            placeholder="search..."
            value={text}
            onChange={(e: ChangeEvent) =>
              setText((e.target as HTMLInputElement).value)
            }
          />
        </li>

      </ul>
    </div>
  );
}

export default ComponentTest;
