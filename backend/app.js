import express from "express"
import TodoRoute from "./Routes/Todo.js"
import RoutineRoute from "./Routes/Routine.js"
import cors from "cors"
import { sequelize } from "./Database/database.js";
import dotenv from 'dotenv'; // dotenv 패키지를 사용하여 환경 변수 로드
dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
app.use(cors());
// app.use(morgan("tiny"));
app.use(
  cors({
    origin: "*", // 모든 출처 허용 옵션. true 를 써도 된다.
  })
);
app.use(
  cors({
    origin: true, // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);
const port = 8080;
sequelize.sync().then((client) => {
    // console.log(client,"client")
});
app.use(TodoRoute);
app.use(RoutineRoute);
app.get("/", (req, res) => {
  res.send("Hello, Node.js!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} ${JSON.stringify(process.env.DB_HOST)}${process.env.DB_PASSWORD}`);
});
