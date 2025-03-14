import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import usersRouters from "./routes/users.routes";
import loginRouters from "./routes/login.routes";
import reservations from "./routes/reservations.routes";
import payments from "./routes/payments.routes";
import exportData from "./routes/exportData.routes";

import errorHandler from "./middlewares/handleError";

const app = express();

app.use(helmet());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://192.168.0.233:5173",
    "http://172.20.10.3:5173",
    "https://mangata-ui-client.vercel.app",
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
app.use("/api", exportData);
app.use(payments);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
