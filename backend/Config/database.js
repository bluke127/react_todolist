import { Sequelize } from "sequelize";
import dotenv from 'dotenv'; // dotenv 패키지를 사용하여 환경 변수 로드
dotenv.config();
// Sequelize 인스턴스 생성
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER, // 여기에 올바른 사용자 이름을 입력하세요.
  password: process.env.DB_PASSWORD, // 여기에 올바른 비밀번호를 입력하세요.
  database: process.env.DB_DATABASE,
  timezone: '+09:00', // 로컬 시간대에 맞게 설정 (+09:00은 한국 시간대 예시)
});
export default sequelize;
