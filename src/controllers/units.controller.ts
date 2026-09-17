import { Request, Response, NextFunction } from "express";
import * as unitsService from "../services/units.service.js";
import { ApiError } from "../apiError.js";

export function listar(req: Request, res: Response, next: NextFunction): void {
  try {
    const resultado = unitsService.listarUnits();
    res.json({ total: resultado.length, units: resultado, requestId: req.id });
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
    const unit = unitsService.buscarUnitPorId(id);
    res.json({ unit, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function crear(req: Request, res: Response, next: NextFunction): void {
  try {
    const nuevoUnit = unitsService.crearUnit(req.body);
    res.status(201).json({ unit: nuevoUnit, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function actualizar(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    const actualizado = unitsService.actualizarUnit(id, req.body);
    res.json({ unit: actualizado, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function eliminar(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    unitsService.eliminarUnit(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
