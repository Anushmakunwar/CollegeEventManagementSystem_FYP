import express, { Request, Response, NextFunction } from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.routes";
import schoolRouter from "../modules/school/school.routes";
import facultyRouter from "../modules/faculty/faculty.routes";
import eventRouter from "../modules/event/event.routes";
const router = express.Router();

router.use("/auths", authRouter);
router.use("/users", userRouter);
router.use("/schools", schoolRouter);
router.use("/faculties", facultyRouter);
router.use("/events", eventRouter);

router.get("/", (req: Request, res: Response) => {
  res.send("API VERSONING");
});

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.json({ data: "", msg: "Route not found" });
});

export default router;
