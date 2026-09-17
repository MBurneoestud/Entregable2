import { ArmyList } from "../models/ArmyList.js";
import { CreateArmyList, UpdateArmyList } from "../types.js";
import { ApiError } from "../apiError.js";

const armyLists: Map<number, ArmyList> = new Map();
let siguienteId = 1;

export function listarArmyLists(): Array<{ id: number; armyList: ArmyList }> {
  return Array.from(armyLists.entries()).map(([id, armyList]) => ({ id, armyList }));
}

export function buscarArmyListPorId(id: number): ArmyList {
  const armyList = armyLists.get(id);
  if (!armyList) {
    throw new ApiError(404, `Army list con id ${id} no encontrado`);
  }
  return armyList;
}

export function crearArmyList(datos: CreateArmyList): { id: number; armyList: ArmyList } {
  if (!datos.name) {
    throw new ApiError(400, "name es obligatorio");
  }

  const armyList = new ArmyList(datos.name, datos.faction);
  armyList.pointLimit = datos.pointLimit || armyList.pointLimit;
  armyList.keywordLimits = datos.keywordLimits || armyList.keywordLimits;

  const id = siguienteId;
  siguienteId += 1;
  armyLists.set(id, armyList);
  return { id, armyList };
}

export function actualizarArmyList(id: number, cambios: UpdateArmyList): ArmyList {
  const armyList = buscarArmyListPorId(id);

  if (cambios.name !== undefined) {
    armyList.name = cambios.name;
  }
  if (cambios.faction !== undefined) {
    armyList.faction = cambios.faction;
  }
  if (cambios.pointLimit !== undefined) {
    armyList.pointLimit = cambios.pointLimit;
  }
  if (cambios.keywordLimits !== undefined) {
    armyList.keywordLimits = cambios.keywordLimits;
  }
  if (cambios.units !== undefined) {
    armyList.units = cambios.units;
  }

  return armyList;
}

export function eliminarArmyList(id: number): void {
  if (!armyLists.has(id)) {
    throw new ApiError(404, `Army list con id ${id} no encontrado`);
  }
  armyLists.delete(id);
}
