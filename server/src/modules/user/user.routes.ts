import express, { Request, Response, NextFunction } from "express";
import * as controller from "./user.controller";
const router = express.Router();
import { respond } from "../../utils/response";
import secureAPI from "../../utils/secure";

router.post(
  "/",
  secureAPI(["SUPERADMIN", "SCHOOLADMIN", "ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.createUser(
        //@ts-ignore
        req.currentRoles as string[],
        //@ts-ignore
        req.schoolId as string,
        //@ts-ignore
        req.facultyId as string,
        req.body,
      );
      respond(res, 200, "User created successfully", result);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  "/list",
  secureAPI(["SUPERADMIN", "SCHOOLADMIN", "ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, search } = req.query;
      const parsedPage = page ? parseInt(page as string, 10) : undefined;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;

      const searchParams: { schoolId?: string; roles?: string } = {};

      //@ts-ignore
      req.schoolId && (searchParams.schoolId = req.schoolId);

      typeof search === "string" && (searchParams.roles = search);

      const result = await controller.getUser(
        parsedLimit,
        parsedPage,
        searchParams,
      );
      respond(res, 200, "User fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);
router.get(
  "/list/student",
  secureAPI(["SCHOOLADMIN", "ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, search } = req.query;
      const parsedPage = page ? parseInt(page as string, 10) : undefined;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;

      const searchParams: { schoolId?: string; facultyId?: string } = {};

      //@ts-ignore
      req.schoolId && (searchParams.schoolId = req.schoolId);
      //@ts-ignore
      req.facultyId && (searchParams.facultyId = req.facultyId);

      const result = await controller.getStudents(
        parsedLimit,
        parsedPage,
        searchParams,
      );
      respond(res, 200, "User fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);
router.get(
  "/std-profile",
  secureAPI(["STUDENT"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //@ts-ignore
      let id = req.currentUser;
      const result = await controller.studentProfile(id as string);
      respond(res, 200, "User fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);
router.get(
  "/admin-profile",
  secureAPI(["ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //@ts-ignore
      let id = req.currentUser;
      const result = await controller.adminProfile(id as string);
      respond(res, 200, "User fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  "/:id",
  // secureAPI(["SCHOOLADMIN", "SCHOOLADMIN", "ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await controller.getById(id);
      respond(res, 200, "User fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  "/:id",
  // secureAPI(["SCHOOLADMIN", "SCHOOLADMIN", "ADMIN", "STUDENT"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await controller.updateById(id, req.body);
      respond(res, 200, "User updated successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  "/reset-password/:id",
  secureAPI(["SCHOOLADMIN", "SCHOOLADMIN", "ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await controller.resetPassword(id, req.body.password);
      respond(res, 200, "Password reset successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  "/block/:id",
  secureAPI(["SCHOOLADMIN", "SCHOOLADMIN", "ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await controller.block(id, req.body.isActive);
      respond(res, 200, "User blocked successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  "/archive/:id",
  secureAPI(["SCHOOLADMIN", "SCHOOLADMIN", "ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await controller.archive(id, req.body.isArchived);
      respond(res, 200, "User archived successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
