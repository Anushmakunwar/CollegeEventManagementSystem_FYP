import express from "express";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index";
import { ErrorHandler } from "./middleware/errorHandler";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", indexRouter);

app.use(ErrorHandler);
export default app;
