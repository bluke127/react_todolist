// Todo.js
import SQ from "sequelize";
import { sequelize } from "../Database/database.js";
import { Content, updateContent } from "./Content.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;
const Op = Sequelize.Op;
export const Todo = sequelize.define("Todo", {
  // 모델 속성들 정의
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.STRING,
  },
});

export async function createTodoData({ date }) {
  return Todo.create({
    date,
  });
}
export async function updateTodoData({ date, contentId, checked, content }) {
  Todo.findOne({ where: { date } }).then((todo) => {
    updateContent({ contentId, checked, content });
  });
}
export async function getTodoData(date ) {
  return Content.findAll({ where: { date } })
}
// Todo.hasMany(Content, { foreignKey: "date", sourceKey: "date" });
