import {
  updateRoutineContent,
  getRoutineContent,
  createRoutineContent,
  deleteRoutineContent,
  findAllDateRoutineContent,
  isExistRoutineContent,
} from "../Models/RoutineContent.js";
import {
  getRoutineContentData,
  deleteRoutineData,
  createRoutineData,
  isExistRoutine,
} from "../Models/Routine.js";

export async function cudRoutine(req, res) {
  const data = req.body.data;
  try {
    let arr = []; //잔존할 데이터
    let forgDay;
    for (let { contentId, day } of data) {
      forgDay = day;
      arr.push(contentId);
    }
    let allData = await findAllDateRoutineContent(forgDay);
    //잔존하지 않을 데이터는 삭제
    for (let data of allData) {
      if (!arr.includes(data.id)) {
        await deleteRoutineContent({ contentId: data.id });
      }
    }
    let index = 0;
    for (let { contentId, checked, content, day } of data) {
      console.log(allData, "alldata", data);
      if (!(await getRoutineContent({ contentId }))) {
        await createRoutineContent({
          checked,
          content,
          contentDay: day,
          sort: index,
        });
      } else {
        await updateRoutineContent({
          contentId,
          checked,
          content,
          sort: index,
        });
      }
      index++;
    }

    console.log((await isExistRoutineContent({ day: forgDay }), "????"));
    console.log(await isExistRoutine(forgDay), "!!!!");
    if (!(await isExistRoutineContent({ day: forgDay }))) {
      await deleteRoutineData({ day: forgDay });
      return res.status(200).json({ message: `${forgDay} 루틴 저장 삭제` });
    }
    if (!(await isExistRoutine(forgDay))) {
      await createRoutineData({ day: forgDay });
    }
    return res.status(200).json("루틴 저장 완료");
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
export const getRoutine = async (req, res) => {
  const { day } = req.query;

  try {
    let response = await getRoutineContentData(day);
    console.log(day, response, "day");
    response = response
      ? {
          day,
          content: response
            .sort((a, b) => a.sort - b.sort)
            .map((todo) => {
              return {
                content: todo.content,
                contentId: todo.id,
                checked: todo.completed,
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
