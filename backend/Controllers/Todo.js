// import { Todo } from "../Models/Todo.js";
import {
  updateContent,
  getContent,
  createContent,
  deleteContent,
  findAllDateContent,
  isExistContent,
} from "../Models/Content.js";
import { getContentData, deleteTodoData,createTodoData, isExistTodo } from "../Models/Todo.js";

export async function cudTodo(req, res) {
  const data = req.body.data;
  try {
    let arr = []; //잔존할 데이터
    let forgDate;
    for (let { contentId, date } of data) {
      forgDate = date;
      arr.push(contentId);
    }
    let allData = await findAllDateContent(forgDate);
    //잔존하지 않을 데이터는 삭제
    for (let data of allData) {
      if (!arr.includes(data.contentId)) {
        await deleteContent({ contentId: data.contentId });
      }
    }
    for (let { contentId, checked, content, date } of data) {
      console.log(allData, "alldata", data);
      if (!(await getContent(contentId))) {
        await createContent({ checked, content, contentDate: date });
      } else {
        await updateContent({ contentId, checked, content });
      }
    }
    
    console.log((await isExistContent({ date: forgDate }),"????"))
    console.log((await isExistTodo(forgDate)),"!!!!")
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
    console.log(date, "date");
    let response = await getContentData(date);
    response = response?{date,content:response.map(todo=>{return {content:todo.content,contentId:todo.content,checked:todo.completed}})}:[]
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
