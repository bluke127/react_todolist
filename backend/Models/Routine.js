// Todo.js
import SQ from "sequelize";
import { sequelize } from "../Database/database.js";
import {
  RoutineContent,
  findAllDateRoutineContent,
  updateRoutineContent,
} from "./RoutineContent.js";
import { Content } from "./Content.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;
const Op = Sequelize.Op;
export const Routine = sequelize.define(
  "Routine",
  {
    // 모델 속성들 정의
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timezone: "+09:00", // 로컬 시간대에 맞게 설정 (+09:00은 한국 시간대 예시),
    timestamps: true, // timestamps 옵션을 true로 설정하여 createdAt 및 updatedAt 필드 추가
  }
);

export async function createRoutineData({ day, content, contentDate }) {
  return Routine.create({ day });
}
export async function updateRoutineData({ day, contentId, checked, content }) {
  Routine.findOne({ where: { day } }).then((todo) => {
    updateRoutineContent({ contentId, checked, content });
  });
}
export async function deleteRoutineData({ day }) {
  Routine.findOne({ where: { day } }).then((routine) => {
    return routine.destroy();
  });
}
export async function getRoutineContentData(day) {

  return RoutineContent.findAll({ where: { contentDay: day } });
}
export async function isExistRoutine(day) {
  return await Routine.count({ where: { day } });
}
export default Routine;
