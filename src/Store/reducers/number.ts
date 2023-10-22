const INITIAL_NUM: number = 0;
export const reducer = (
  state = INITIAL_NUM,
  action: { type: string; payload: number }
) => {
  switch (action.type) {
    case "PLUS":
      return state + action.payload;
    case "MINUS":
      return state - action.payload;
    default:
      state;
  }
};
