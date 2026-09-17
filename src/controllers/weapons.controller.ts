import { Request, Response, NextFunction } from "express";
import * as weaponsService from "../services/weapons.service.js";
import { ApiError } from "../apiError.js";

export function listar(req: Request, res: Response, next: NextFunction): void {
  try {
    const resultado = weaponsService.listarWeapons();
    res.json({ total: resultado.length, weapons: resultado, requestId: req.id });
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
    const weapon = weaponsService.buscarWeaponPorId(id);
    res.json({ weapon, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function crear(req: Request, res: Response, next: NextFunction): void {
  try {
    const nuevoWeapon = weaponsService.crearWeapon(req.body);
    res.status(201).json({ weapon: nuevoWeapon, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function actualizar(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    const actualizado = weaponsService.actualizarWeapon(id, req.body);
    res.json({ weapon: actualizado, requestId: req.id });
  } catch (error) {
    next(error);
  }
}

export function eliminar(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = Number(req.params.id);
    weaponsService.eliminarWeapon(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
