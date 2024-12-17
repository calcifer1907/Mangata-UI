import express from "express";
import morgan from "morgan";
import cors from "cors";

import usersRouters from "../src/routes/users.routes.js";
import protectedRoute from "../src/routes/protected.routes.js";
import loginRouters from "../src/routes/login.routes.js";
import reservations from "../src/routes/reservations.routes.js";
import { handleError } from "./handles/handleEror.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.0.233:5173"],
};

const PORT = 8080;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/auth", loginRouters);
app.use("/api", usersRouters);
app.use("/api", protectedRoute);
app.use("/api", reservations);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
