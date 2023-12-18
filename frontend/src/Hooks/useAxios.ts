import axios from "axios";

import { SetAxiosResult } from "../Store/reducers/axiosUtils";
import { useDispatch } from "react-redux";
import { Dispatch, useEffect } from "react";
import { AnyAction } from "redux";
const useAxiosHook = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const baseApiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // 리소스 접근 허용
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    // 서로 다른 도메인간 쿠키 전달 허용
    // axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";

    axios.defaults.headers.common["Content-Type"] =
      "application/x-www-form-urlencoded";
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
    console.log(token, "토큰");
    let Authorization = "Bearer " + token;
    axios.defaults.headers.common["Authorization"] = Authorization;
  });
  const instance = axios.create({
    baseURL: baseApiUrl,
  });
  instance.interceptors.request.use(
    (config: any) => {

      dispatch(SetAxiosResult("Loading"));
      return {
        ...config,
      };
    },
    (error) => {
      dispatch(SetAxiosResult("Error"));
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (config: any) => {
      dispatch(SetAxiosResult("Success"));
      console.log("interceptors.response:config", config);
      return config.data;
    },
    (error: any) => {
      console.log("interceptors.response:error", error);
      dispatch(SetAxiosResult("Error"));
      if (error.response && error.response.status === 401) {
        // store.commit("needLogin", error.response.data);
      }
      return Promise.reject(error);
    }
  );

  const api = {
    get: async ({ url, query, baseURL }: any) => {
      const method = "get";
      const params = query;
      const response = await instance({ baseURL, url, method, params });
      return response;
    },
    post: ({ url, query }: { url: string; query: any }) => {
      const params = query;
      return instance.post(url, params);
    },
    delete: ({ url, query }: { url: string; query: any }) => {
      const params = query;
      return instance.delete(url, {
        data: params,
      });
    },
    put: ({ url, query }: { url: string; query: any }) => {
      const params = query;
      return instance.put(url, params);
    },
  };
  return api;
};
export default useAxiosHook;
