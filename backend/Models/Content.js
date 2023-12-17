// Content.js
import SQ from "sequelize";
import { sequelize } from "../Database/database.js";
import { Todo } from "./Todo.js";

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;
const Op = Sequelize.Op;
export const Content = sequelize.define("Content", {
  // 모델 속성들 정의
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
  },
  contentDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Content.belongsTo(Todo, { as: "requestFriend" });

export async function createContent({ checked, content, contentDate }) {
  console.log("creaate");
  return Content.create({
    completed: checked,
    content,
    contentDate,
  });
}

export async function updateContent({ contentId, checked, content }) {
  console.log("update");
  const contentData = await Content.findByPk(contentId);
  if (contentData) {
    contentData.completed = checked;
    contentData.content = content;
    return contentData.save();
  }
}

export async function deleteContent({ contentId }) {
  const contentData = await Content.findByPk(contentId);
  if (contentData) {
    return contentData.destroy();
  }
}
export async function findAllDateContent(date) {
  console.log(date, "sssss");
  const contentData = await Content.findAll({ where: { contentDate: date } });
  return contentData;
}

export async function getContent({ contentId }) {
  return Content.findByPk(contentId);
}
export async function isExistContent({ date }) {
  console.log(
    Content.count({ where: { contentDate: date } }),
    !!(await Content.count({ where: { contentDate: date } })),
    date,
    "ddddd"
  );
  return await Content.count({ where: { contentDate: date } });
}
