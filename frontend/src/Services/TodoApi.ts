import useAxiosHook from "@/Hooks/useAxios";
import { DragNDropItemType } from "../Types";
const url = `/todo`;

export function useTodoApi() {
  let api = useAxiosHook();
  return {
    getTodoApi: function getTodoApi(date: string) {
      let _url = url;
      return api.get({
        url: _url,
        query: { date },
      });
    },
    postTodoApi: function postTodoApi(
      query:
        | Pick<DragNDropItemType, "contentId" | "content" | "checked">
        | "date"[]
    ) {
      let _url = url;
      return api.get({
        url: _url,
        query,
      });
    },
  };
}
