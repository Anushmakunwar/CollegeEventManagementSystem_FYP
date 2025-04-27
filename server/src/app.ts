import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import indexRouter from "./routes/index";
import { ErrorHandler } from "./middleware/errorHandler";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions)); // Apply CORS middleware with options

app.use(cookieParser());

app.get("/hey", (req, res) => {
  res.send("Hello");
});
app.use("/", indexRouter);

app.use(ErrorHandler);
export default app;
