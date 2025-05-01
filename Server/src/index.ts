import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import usersRouters from "./routes/users.routes";
import loginRouters from "./routes/login.routes";
import reservations from "./routes/reservations.routes";
import payments from "./routes/payments.routes";
import exportData from "./routes/exportData.routes";
import socio from "./routes/socio.routes";

import errorHandler from "./middlewares/handleError";

const app = express();

app.use(helmet());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://192.168.0.233:5173",
    "https://mangatabeachclub.com",
    "https://integrations.api.bold.co",
  ],
  credentials: true,
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
app.use("/api", socio);
app.use(payments);
app.use(errorHandler);

app.use((req, res, next) => {
  // res.setHeader(
  //   "Content-Security-Policy",
  //   "default-src 'self'; " +
  //     "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; " +
  //     "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  //     "connect-src 'self' https://mangatabeachclub.com; " +
  //     "frame-src 'self' https://www.youtube.com; " +
  //     "object-src 'none'; " +
  //     "base-uri 'self'; " +
  //     "form-action 'self';"
  // );

  // HSTS
  // res.setHeader(
  //   "Strict-Transport-Security",
  //   "max-age=63072000; includeSubDomains; preload"
  // );

  // X-Content-Type-Options
  res.setHeader("X-Content-Type-Options", "nosniff");

  next();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
