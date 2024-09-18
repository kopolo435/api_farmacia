import "dotenv/config";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import log4js from "log4js";
import api from "./routes/api.js";

// eslint-disable-next-line no-underscore-dangle
global.__dirname = path.resolve("./");
log4js.configure("./app/config/log4js.json");

const app = express();
app.use(compression()); // Compress all routes

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middeware
app.use(express.json());

app.use(
  cors({
    origin: "*",
  }),
);

// Inicializacion de Api
app.use("/", api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // response con error
  res.status(err.status || 500).json({ error: err.message });
});

export default app;
