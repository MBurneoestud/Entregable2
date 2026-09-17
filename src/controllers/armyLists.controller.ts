import { Request, Response, NextFunction } from "express";
import * as armyListsService from "../services/armyLists.service.js";
import { ApiError } from "../apiError.js";

export function listar(req: Request, res: Response, next: NextFunction): void {
  try {
    const resultado = armyListsService.listarArmyLists();
    res.json({ total: resultado.length, armyLists: resultado, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function obtenerPorId(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new ApiError(400, `"${req.params.id}" no es un id válido`);
    }
    const armyList = armyListsService.buscarArmyListPorId(id);
    res.json({ armyList, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function crear(req: Request, res: Response, next: NextFunction): void {
  try {
    const nuevoArmyList = armyListsService.crearArmyList(req.body);
    res.status(201).json({ armyList: nuevoArmyList, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function actualizar(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    const actualizado = armyListsService.actualizarArmyList(id, req.body);
    res.json({ armyList: actualizado, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function eliminar(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    armyListsService.eliminarArmyList(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
