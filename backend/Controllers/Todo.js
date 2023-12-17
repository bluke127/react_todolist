// import { Todo } from "../Models/Todo.js";
import {
  updateContent,
  getContent,
  createContent,
  deleteContent,
  findAllDateContent,
} from "../Models/Content.js";
import { getTodoData } from "../Models/Todo.js";

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
        await deleteContent({contentId:data.contentId});
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
    console.log("?????");
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
    const newTodo = await getTodoData(date);
    return res.status(200).json(newTodo);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
