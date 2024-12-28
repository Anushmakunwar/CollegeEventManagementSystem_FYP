import express, { Request, Response, NextFunction } from "express";
import apiRouter from "./routes.api";

const router = express.Router();

router.use("/api/v1", apiRouter);
router.get("/", (req: Request, res: Response) => {
  res.send("Health checking");
});

export default router;
