import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

/* ---------------- ROUTES ---------------- */

app.get("/", (_req: Request, res: Response) => {
  console.log("ROOT HIT");
  res.send("EduVerse Running 🚀");
});

app.use("/api/v1/auth", userRoutes);

/* ---------------- 404 ---------------- */

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

/* ---------------- GLOBAL ERROR HANDLER (LAST ONLY) ---------------- */

app.use(
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});