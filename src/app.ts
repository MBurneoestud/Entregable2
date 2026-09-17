import express, { Express, Request, Response } from "express";
import { requestId } from "./middlewares/requestId.js";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { ApiError } from "./apiError.js";

export function crearApp(): Express {
  const app = express();

  app.use(express.json());

  app.use(requestId);

  app.use(logger);

  app.get("/api/salud", (req: Request, res: Response) => {
    res.json({ estado: "ok", requestId: req.id });
  });

  app.use((req: Request, res: Response, next) => {
    next(new ApiError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
  });

  app.use(errorHandler);

  return app;
}
