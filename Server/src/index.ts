import express from "express";
import morgan from "morgan";
import cors from "cors";

import usersRouters from "./routes/users.routes";
import loginRouters from "./routes/login.routes";
import reservations from "./routes/reservations.routes";
import { handleError } from "./handles/handleEror";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://192.168.0.233:5173",
    "http://172.20.10.3:5173",
  ],
};

const PORT = process.env.PORT || 8080;

app.get("/", (_request, response) => {
  response.json({ message: "Server" });
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/auth", loginRouters);
app.use("/api", usersRouters);
app.use("/api", reservations);
//@ts-ignore
app.use(handleError);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
