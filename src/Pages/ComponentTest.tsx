import Button from "@/Components/Button/index";
import { useCallback } from 'react';

function ComponentTest() {
  const onButtonClick = useCallback(()=>{
    alert("onButtonClick")
  },[])
  return (
    <div>
      <ul>
        <li>
          <Button onClick={onButtonClick} isDebouncedButton={true}>버튼 클릭</Button>
        </li>
      </ul>
    </div>
  );
}

export default ComponentTest;
