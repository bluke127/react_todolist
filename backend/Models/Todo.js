import { DataTypes } from "sequelize";
import sequelize from "../Config/database.js";

const Todo = sequelize.define(
  "Todo",
  {
    // 모델 속성들 정의
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    plan: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    planDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timezone: '+09:00', // 로컬 시간대에 맞게 설정 (+09:00은 한국 시간대 예시),
    timestamps: true, // timestamps 옵션을 true로 설정하여 createdAt 및 updatedAt 필드 추가
  }
);

export default Todo;
