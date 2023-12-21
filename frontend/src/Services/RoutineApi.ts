import useAxiosHook from "@/Hooks/useAxios";
import { DragNDropItemType } from "../Types";
import { AxiosResponse } from "axios";
const url = `/routine`;
type getRoutineType = { day: string; content: DragNDropItemType[] };
type postRoutineType = Pick<
  DragNDropItemType,
  "contentId" | "content" | "checked"
> & {
  day: string;
};
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
    postRoutineApi(query: postRoutineType[]) {
      let _url = url;
      return api.get({
        url: _url,
        query,
      });
    },
  };
}
