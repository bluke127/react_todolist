import useAxiosHook from "@/Hooks/useAxios";
import { DragNDropItemType } from "../Types";
import { AxiosResponse } from "axios";
const url = `/routine`;
type getRoutineType = { day: string; content: DragNDropItemType[] };
type postRoutineType = Pick<
  DragNDropItemType,
  "contentId" | "content" | "checked"
> & { day: string };
export function useRoutineApi() {
  let api = useAxiosHook();
  return {
    getRoutineApi(day: string): Promise<AxiosResponse<getRoutineType>> {
      let _url = url;
      return api.get({
        url: _url,
        query: { day },
      });
    },
    //모두 삭제되면 요일만 넘겨줌
    postRoutineApi(query: { data: postRoutineType[] | string }) {
      let _url = url;
      return api.post({
        url: _url,
        query,
      });
    },
  };
}
