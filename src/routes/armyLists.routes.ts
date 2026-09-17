import { Router } from "express";
import * as armyListsController from "../controllers/armyLists.controller.js";

export const armyListsRouter = Router();

armyListsRouter.get("/", armyListsController.listar);
armyListsRouter.get("/:id", armyListsController.obtenerPorId);
armyListsRouter.post("/", armyListsController.crear);
armyListsRouter.put("/:id", armyListsController.actualizar);
armyListsRouter.delete("/:id", armyListsController.eliminar);
