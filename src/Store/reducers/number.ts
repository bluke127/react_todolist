const INITIAL_NUM: number = 0;
export function numberIncrease(number:number) {
  return {
      type: "NUMBER/PLUS",
      payload: number
  }
}export function numberDecrease(number:number) {
  return {
      type: "NUMBER/MINUS",
      payload: number
  }
}
export const plusNum = {
  type: "NUMBER/PLUS",
  payload: 1,
};
export const minusNum = {
  type: "NUMBER/MINUS",
  payload: 1,
};

export const numberReducer = (
  state = INITIAL_NUM,
  action: { type: string; payload: number }
) => {
  switch (action.type) {
    case "NUMBER/PLUS":
      return state + action.payload;
    case "NUMBER/MINUS":
      return state - action.payload;
    default:
      return state;
  }
};
