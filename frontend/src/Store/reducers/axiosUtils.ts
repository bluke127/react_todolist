import { AxiosType } from "@/Types/index";

const INITIALSTATE: AxiosType = {
  loading: false,
  error: null,
};

export const SetAxiosResult = (result: "Success" | "Error" | "Loading") => {
  if (result === "Success") {
    return SuccessApi;
  } else if (result === "Error") {
    return ErrorApi;
  } else {
    return LoadingApi;
  }
};
export const SuccessApi = {
  type: "Success",
  result: {
    loading: false,
    error: null,
  },
};
export const ErrorApi = {
  type: "Error",
  result: {
    loading: false,
    error: true,
  },
};
export const LoadingApi = {
  type: "Loading",
  result: {
    loading: true,
    error: null,
  },
};
export const AxiosUtilsReducer = (
  state = INITIALSTATE,
  action: { type: string; result: any }
) => {
  console.log(action, "aaaaaaaa");
  switch (`axios/${action.type}`) {
    case `axios/Success`:
      console.log(action, "bbbbb");
      return { ...state, ...SuccessApi.result };
    case `axios/Error`:
      console.log(action, "bbbbb");
      return { ...state, ...ErrorApi.result };
    case `axios/Loading`:
      console.log(action, "bbbbb");
      return { ...state, ...LoadingApi.result };
    default:
      return state;
  }
};
