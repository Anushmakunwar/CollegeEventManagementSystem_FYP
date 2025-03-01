import express, { Request, Response, NextFunction } from "express";
import * as controller from "./event.controller";
import { respond } from "../../utils/response";
import secureAPI from "../../utils/secure";

const router = express.Router();

router.post(
  "/",
  secureAPI(["SUPERADMIN", "ADMIN", "SCHOOLADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.create(
        // @ts-ignore
        req.currentUser as string,
        // @ts-ignore
        req.currentRoles as string[],
        // @ts-ignore
        req.facultyId as string,
        // @ts-ignore
        req.schoolId as string,
        req.body,
      );
      respond(res, 200, "Event created successfully", result);
    } catch (err) {
      next(err);
    }
  },
);
router.post(
  "/register-event/:id",
  secureAPI(["STUDENT"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //@ts-ignore
      console.log(req.currentUser);
      const result = await controller.registerEvent(
        req.params.id,
        // @ts-ignore
        req.currentUser as string,
      );
      respond(res, 200, "Event registered successfully", result);
    } catch (err) {
      next(err);
    }
  },
);
// router.get(
//   "/list",
//   secureAPI(["SUPERADMIN", "SCHOOLADMIN", "ADMIN", "STUDENT"]),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { page, limit, search } = req.query;
//       const parsedPage = page ? parseInt(page as string, 10) : undefined;
//       const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;

//       const searchParams =
//         typeof search === "string" ? { name: search } : undefined;
//       const result = await controller.listEvent(
//         parsedLimit,
//         parsedPage,
//         searchParams,
//       );
//       respond(res, 200, "Event fetched successfully", {
//         result,
//       });
//     } catch (err) {
//       next(err);
//     }
//   },
// );

router.get(
  "/list",
  secureAPI(["ADMIN", "SCHOOLADMIN", "STUDENT"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, search } = req.query;
      const parsedPage = page ? parseInt(page as string, 10) : undefined;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;
      //@ts-ignore
      const searchParams =
        typeof search === "string" ? { name: search } : undefined;
      const result = await controller.listEventForSchoolUser(
        // @ts-ignore
        req.schoolId as string,
        // @ts-ignore
        req.facultyId as string,
        // @ts-ignore
        req.currentRoles as string[],
        parsedLimit,
        parsedPage,
        searchParams,
      );
      respond(res, 200, "Event fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  "/:id",
  secureAPI(["SUPERADMIN", "SCHOOLADMIN", "ADMIN", "STUDENT"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.getById(
        req.params.id,
        //@ts-ignore
        req.currentUser,
      );
      respond(res, 200, "Event fetched successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  "/:id",
  secureAPI(["SUPERADMIN", "SCHOOLADMIN", "ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.update(req.params.id, req.body);
      respond(res, 200, "Event updated successfully", result);
    } catch (err) {
      next(err);
    }
  },
);
router.delete(
  "/:id",
  secureAPI(["SUPERADMIN", "SCHOOLADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.remove(req.params.id);
      respond(res, 200, "Event deleted successfully", result);
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  "/",
  // secureAPI(["SCHOOLADMIN", "ADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.eventAttendance(
        req.body.userId,
        req.body.eventId,
      );
      respond(res, 200, "Event deleted successfully", result);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
