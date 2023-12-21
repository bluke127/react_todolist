import useAxiosHook from "@/Hooks/useAxios";
import { DragNDropItemType } from "../Types";
import { AxiosResponse } from "axios";
const url = `/routine`;
type GetRoutineType = { day: string; content: DragNDropItemType[] };
type PostRoutineType = Pick<
  DragNDropItemType,
  "contentId" | "content" | "checked"
> & { day: string };
export function useRoutineApi() {
  let api = useAxiosHook();
  return {
    getRoutineApi(day: string): Promise<AxiosResponse<GetRoutineType>> {
      let _url = url;
      return api.get({
        url: _url,
        query: { day },
      });
    },
    //모두 삭제되면 날짜만 넘겨줌
    postRoutineApi(query: { data: PostRoutineType[] | string }) {
      let _url = url;
      return api.post({
        url: _url,
        query,
      });
    },
  };
}
