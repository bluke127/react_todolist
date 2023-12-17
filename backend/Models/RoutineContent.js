// Content.js
import SQ from "sequelize";
import { sequelize } from "../Database/database.js";
import { Routine } from "./Routine.js";

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;
export const RoutineContent = sequelize.define("RoutineContent", {
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
  contentDay: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
RoutineContent.belongsTo(Routine);

export async function createRoutineContent({ checked, content, contentDay }) {
  console.log("creaate");
  return RoutineContent.create({
    completed: checked,
    content,
    contentDay,
  });
}

export async function updateRoutineContent({ contentId, checked, content }) {
  console.log("update");
  const contentData = await RoutineContent.findByPk(contentId);
  if (contentData) {
    contentData.completed = checked;
    contentData.content = content;
    return contentData.save();
  }
}

export async function deleteRoutineContent({ contentId }) {
  const contentData = await RoutineContent.findByPk(contentId);
  if (contentData) {
    return contentData.destroy();
  }
}
export async function findAllDateRoutineContent(day) {
  console.log(day, "sssss");
  const contentData = await RoutineContent.findAll({
    where: { contentDay: day },
  });
  return contentData;
}

export async function getRoutineContent({ contentId }) {
  return RoutineContent.findByPk(contentId);
}
export async function isExistRoutineContent({ day }) {
  console.log(
    RoutineContent.count({ where: { contentDay: day } }),
    !!(await RoutineContent.count({ where: { contentDay: day } })),
    
    "ddddd"
  );
  return await RoutineContent.count({ where: { contentDay: day } });
}
