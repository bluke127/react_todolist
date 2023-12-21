// import { Todo } from "../Models/Todo.js";
import {
  updateContent,
  getContent,
  createContent,
  deleteContent,
  findAllDateContent,
  isExistContent,
} from "../Models/Content.js";
import {
  getContentData,
  deleteTodoData,
  createTodoData,
  isExistTodo,
} from "../Models/Todo.js";

export async function cudTodo(req, res) {
  const data = req.body.data;
  try {
    let arr = []; //잔존할 데이터
    let forgDate;
    if (typeof data !== "string") {
      for (let { contentId, date } of data) {
        forgDate = date;
        arr.push(contentId);
      }
    } else {
      forgDate = data;
    }
    let allData = await findAllDateContent(forgDate);
    //잔존하지 않을 데이터는 삭제
    for (let data of allData) {
      if (!arr.includes(data.id)) {
        await deleteContent({ contentId: data.id });
      }
    }

    if (typeof data !== "string") {
      let index = 0;
      for (let { contentId, checked, content, date, routineId } of data) {
        let findtodo = await getContent({ contentId })
        //routine으로 생성된 계획이 아니고, 새로 추가된 계획이라면 추가
        if (!(findtodo)) {
          await createContent({
            checked,
            content,
            contentDate: date,
            sort: index,
            routineId: routineId,
          });
        //   //routine으로 생성된 계획이고 contentid는 없는 상황
        // } else if((findRoutineTodo) && !(findtodo)){
        //   await createContent({
        //     checked,
        //     content,
        //     contentDate: date,
        //     sort: index,
        //     routineId: routineId,
        //   });
        }else {
          await updateContent({
            contentId,
            checked,
            content,
            sort: index,
            routineId: routineId,
          });
        }
        index++;
      }
    }

    if (!(await isExistContent({ date: forgDate }))) {
      await deleteTodoData({ date: forgDate });
      return res.status(200).json({ message: `${forgDate} 할일 저장 삭제` });
    }
    if (!(await isExistTodo(forgDate))) {
      await createTodoData({ date: forgDate });
    }
    return res.status(200).json("할일 저장 완료");
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
export const getTodo = async (req, res) => {
  const { date } = req.query;

  try {
    let response = await getContentData(date);
    response = response
      ? {
          date,
          content: response
            .sort((a, b) => a.sort - b.sort)
            .map((todo) => {
              return {
                content: todo.content,
                contentId: todo.id,
                checked: todo.completed,
                routineId: todo.routineId,
              };
            }),
        }
      : [];
    return res.status(200).json({ data: response });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
