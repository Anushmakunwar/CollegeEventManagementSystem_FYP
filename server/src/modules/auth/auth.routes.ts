import express, { Request, Response, NextFunction } from "express";
import * as controller from "./auth.controller";
import { respond } from "../../utils/response";
import secureAPI from "../../utils/secure";

const router = express.Router();

router.post(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies["refreshToken"];
      const result = await controller.refreshAccessToken(refreshToken);
      respond(res, 200, "Access token created successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.register(req.body);
      respond(res, 200, "User registered successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await controller.login(email, password, res);
      respond(res, 200, "Login successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/regenerate",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.regenerateToken(req.body.email);
      respond(res, 200, "Token regenerated successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/verify",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.verify({
        email: req.body.email,
        otp: req.body.otp,
      });
      respond(res, 200, "Email verified successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.logout(req, res);
      respond(res, 200, "Logout successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/generate-fb-token",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.generateFbToken(req.body.email);
      respond(res, 200, "Token generated successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);
router.put(
  "/regenerate-fb-token",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.regenerateFPToken(req.body.email);
      respond(res, 200, "Token regenerated successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  "/forget-password",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.forgetPassword(
        req.body.email,
        req.body.otp,
        req.body.password,
      );
      respond(res, 200, "Token generated successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  "/change-password",
  secureAPI(["ADMIN", "SCHOOLADMIN", "STUDENT", "SUPERADMIN"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.changePassword(
        req.body.email,
        req.body.oldPassword,
        req.body.newPassword,
      );
      respond(res, 200, "Password changed successfully", {
        result,
      });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
