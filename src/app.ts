import express, { Express, Request, Response } from "express";
import { requestId } from "./middlewares/requestId.js";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { ApiError } from "./apiError.js";
import { armyListsRouter } from "./routes/armyLists.routes.js";
import { unitsRouter } from "./routes/units.routes.js";
import { weaponsRouter } from "./routes/weapons.routes.js";

export function crearApp(): Express {
  const app = express();

  app.use(express.json());

  app.use(requestId);

  app.use(logger);

  app.get("/api/salud", (req: Request, res: Response) => {
    res.json({ estado: "ok", requestId: req.id });
  });

  app.use("/api/armylists", armyListsRouter);
  app.use("/api/units", unitsRouter);
  app.use("/api/weapons", weaponsRouter);

  app.use((req: Request, res: Response, next) => {
    next(new ApiError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
  });

  app.use(errorHandler);

  return app;
}
