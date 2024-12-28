import express, { Request, Response, NextFunction } from "express";
import authRouter from "../modules/auth/auth.routes";
const router = express.Router();

router.use("/auths", authRouter);
router.get("/", (req: Request, res: Response) => {
  res.send("API VERSONING");
});

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.json({ data: "", mssg: "Route not found" });
});

export default router;
