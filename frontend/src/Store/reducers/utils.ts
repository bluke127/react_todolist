const INITAIL_FOCUS_TARGET: string | HTMLElement = "test";
const INITAIL_STATE = { FOCUS_TARGET: INITAIL_FOCUS_TARGET };
export const SetFocusTarget = (target: any) => {
  return {
    type: `UTILS/FocusTarget`,
    payload: target,
  };
};
export const focusTarget = {
  type: "UTILS/FocusTarget",
  payload: "ttt",
};

export const UtilsReducer = (
  state = INITAIL_STATE,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case `UTILS/FocusTarget`:
      return { ...state, FOCUS_TARGET: action.payload };
    default:
      return state;
  }
};
