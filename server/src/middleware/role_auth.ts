import { Request, Response, NextFunction } from "express";

export const restrictTo =
  (...roles: ("Admin" | "Student" | "Instructor")[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };

export const isStudent = restrictTo("Student");

export const isAdmin = restrictTo("Admin");

export const isInstructor = restrictTo("Instructor");