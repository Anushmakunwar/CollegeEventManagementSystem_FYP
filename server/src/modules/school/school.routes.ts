import express, { Request, Response, NextFunction } from "express";
import * as controller from "./school.controller";
import { respond } from "../../utils/response";
import secureAPI from "../../utils/secure";

const router = express.Router();

router.post(
  "/",
  secureAPI(["SUPERADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.create(req.body);
      respond(res, 200, "School created successfully", result);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  "/list",
  secureAPI(["SUPERADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, search } = req.query;
      const parsedPage = page ? parseInt(page as string, 10) : undefined;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;

      const searchParams =
        typeof search === "string" ? { name: search } : undefined;
      const result = await controller.listSchool(
        parsedLimit,
        parsedPage,
        searchParams,
      );
      respond(res, 200, "School fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  "/faculty-by-suffix",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { suffix } = req.query;
      const result = await controller.getFacultyBySuffix(suffix as string);
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
      const { id } = req.params;
      const result = await controller.getById(id);
      respond(res, 200, "School fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);
router.put(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.updateById(req.params.id, req.body);
      respond(res, 200, "School updated successfully", result);
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  "/assign-admin/:id",
  secureAPI(["SUPERADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.assignSchoolAdmin(
        req.params.id,
        req.body.adminId,
      );
      respond(res, 200, "Admin assigned successfully", result);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.deleteById(req.params.id);
      respond(res, 200, "School deleted successfully", result);
    } catch (err) {
      next(err);
    }
  },
);
export default router;
