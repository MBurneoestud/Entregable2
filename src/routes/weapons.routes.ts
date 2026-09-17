import { Router } from "express";
import * as weaponsController from "../controllers/weapons.controller.js";

export const weaponsRouter = Router();

weaponsRouter.get("/", weaponsController.listar);
weaponsRouter.get("/:id", weaponsController.obtenerPorId);
weaponsRouter.post("/", weaponsController.crear);
weaponsRouter.put("/:id", weaponsController.actualizar);
weaponsRouter.delete("/:id", weaponsController.eliminar);
