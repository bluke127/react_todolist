import useAxiosHook from "@/Hooks/useAxios";
import { DragNDropItemType } from "../Types";
import { AxiosResponse } from "axios";
const url = `/todo`;
type GetTodoType = { date: string; content: DragNDropItemType[] };
type PostTodoType = Pick<
  DragNDropItemType,
  "contentId" | "content" | "checked"
> & { date: string };
export function useTodoApi() {
  let api = useAxiosHook();
  return {
    getTodoApi(date: string): Promise<AxiosResponse<GetTodoType>> {
      let _url = url;
      return api.get({
        url: _url,
        query: { date },
      });
    },
    //모두 삭제되면 날짜만 넘겨줌
    postTodoApi(query: { data: PostTodoType[] | string }) {
      let _url = url;
      console.log(query, "@@@@");
      return api.post({
        url: _url,
        query: query,
      });
    },
  };
}
