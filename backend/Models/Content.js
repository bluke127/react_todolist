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
  sort: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // unique:true,
    defaultValue: 0, // 적절한 기본값 설정
  },
  routineId:{
    type: DataTypes.INTEGER,
  }
});

Content.belongsTo(Todo, { as: "requestFriend" });

export async function createContent({ checked, content, contentDate, sort,routineId }) {
  return Content.create({
    completed: checked,
    content,
    contentDate,
    sort,
    routineId
  });
}

export async function updateContent({ contentId, checked, content, sort }) {
  const contentData = await Content.findByPk(contentId);
  if (contentData) {
    contentData.completed = checked;
    contentData.content = content;
    contentData.sort = sort;
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
  const contentData = await Content.findAll({ where: { contentDate: date } });
  return contentData.map((v) => v.dataValues);
}

export async function getContent({ contentId }) {
  return Content.findByPk(contentId);
}
export async function isExistContent({ date }) {
  return await Content.count({ where: { contentDate: date } });
}
