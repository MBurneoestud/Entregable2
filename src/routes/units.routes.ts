import { Router } from "express";
import * as unitsController from "../controllers/units.controller.js";

export const unitsRouter = Router();

unitsRouter.get("/", unitsController.listar);
unitsRouter.get("/:id", unitsController.obtenerPorId);
unitsRouter.post("/", unitsController.crear);
unitsRouter.put("/:id", unitsController.actualizar);
unitsRouter.delete("/:id", unitsController.eliminar);
