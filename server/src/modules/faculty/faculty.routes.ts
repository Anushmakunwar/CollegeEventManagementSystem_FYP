import express, { Request, Response, NextFunction } from "express";
import * as controller from "./faculty.controller";
const router = express.Router();
import { respond } from "../../utils/response";
import secureAPI from "../../utils/secure";

router.post(
  "/",
  secureAPI(["SCHOOLADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.create(
        req.body,
        // @ts-ignore
        req.schoolId as string,
      );

      respond(res, 200, "Faculty created successfully", result);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  "/list-approval-student",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, search } = req.query;
      const parsedPage = page ? parseInt(page as string, 10) : undefined;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;

      // const searchParams =
      //   typeof search === "string" ? { roles: search } : undefined;
      const result = await controller.listStudentApproval(
        parsedLimit,
        parsedPage,
        //@ts
        // searchParams,
        //@ts-ignore
        req.schoolId as string,
        //@ts-ignore
        req.facultyId as string,
      );
      respond(res, 200, "Faculty fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);
router.get(
  "/list",
  secureAPI(["SCHOOLADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, search } = req.query;
      const parsedPage = page ? parseInt(page as string, 10) : undefined;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;

      const searchParams =
        typeof search === "string" ? { name: search } : undefined;
      const result = await controller.listFaculty(
        parsedLimit,
        parsedPage,
        searchParams,
        //@ts-ignore
        req.schoolId as string,
      );
      respond(res, 200, "Faculty fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);
router.get(
  "/:id",
  secureAPI(["SUPERADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.getById(req.params.id);
      respond(res, 200, "Faculty fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  "/approve-student/:id",
  secureAPI(["ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.approveStudent(
        req.params.id,
        req.body.status,
        //@ts-ignore
        req.schoolId,
        //@ts-ignore
        req.facultyId,
      );
      respond(res, 200, "Student Approval updated successfully", result);
    } catch (err) {
      next(err);
    }
  },
);
router.put(
  "/:id",
  secureAPI(["SUPERADMIN", "SCHOOLADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.updateById(req.params.id, req.body);
      respond(res, 200, "Faculty updated successfully", result);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  "/:id",
  secureAPI(["SUPERADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.deleteById(req.params.id);
      respond(res, 200, "Faculty deleted successfully", result);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
