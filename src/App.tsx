import Test01 from "@/Pages/Test01";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { numberDecrease, numberIncrease } from './Store/reducers/number';

function App() {
  const dispatch :Dispatch<AnyAction>= useDispatch();
  const selector = useSelector((state:ReducerType)=>state.numberReducer);
  const increase = useCallback(() => {
    dispatch(numberIncrease(1));

  }, []);
  const decrease = useCallback(() => {
    dispatch(numberDecrease(1));

  }, []);
  return (
    <div className="App">
      <Test01 />
      {selector}
      <button onClick={increase}>+++</button>
      <button onClick={decrease}>---</button>
    </div>
  );
}

export default App;
