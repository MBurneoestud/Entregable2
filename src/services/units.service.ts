import { Unit } from "../models/Unit.js";
import { CreateUnit, UpdateUnit } from "../types.js";
import { ApiError } from "../apiError.js";

const units: Map<number, Unit> = new Map();
let siguienteId = 1;

export function listarUnits(): Array<{ id: number; unit: Unit }> {
  return Array.from(units.entries()).map(([id, unit]) => ({ id, unit }));
}

export function buscarUnitPorId(id: number): Unit {
  const unit = units.get(id);
  if (!unit) {
    throw new ApiError(404, `Unit con id ${id} no encontrado`);
  }
  return unit;
}

export function crearUnit(datos: CreateUnit): { id: number; unit: Unit } {
  if (!datos.name) {
    throw new ApiError(400, "name es obligatorio");
  }

  const unit = new Unit(datos.name, datos.basePoints, datos.keywords, datos.availableWeapons);
  
  const id = siguienteId;
  siguienteId += 1;
  units.set(id, unit);
  return { id, unit };
}

export function actualizarUnit(id: number, cambios: UpdateUnit): Unit {
  const unit = buscarUnitPorId(id);

  if (cambios.name !== undefined) {
    unit.name = cambios.name;
  }
  if (cambios.basePoints !== undefined) {
    unit.basePoints = cambios.basePoints;
  }
  if (cambios.keywords !== undefined) {
    unit.keywords = cambios.keywords;
  }
  if (cambios.availableWeapons !== undefined) {
    unit.availableWeapons = cambios.availableWeapons;
  }
  if (cambios.equippedWeapons !== undefined) {
    unit.equippedWeapons = cambios.equippedWeapons;
  }

  return unit;
}

export function eliminarUnit(id: number): void {
  if (!units.has(id)) {
    throw new ApiError(404, `Unit con id ${id} no encontrado`);
  }
  units.delete(id);
}
