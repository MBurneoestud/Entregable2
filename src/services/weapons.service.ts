import { Weapon } from "../models/Weapon.js";
import { CreateWeapon, UpdateWeapon } from "../types.js";
import { ApiError } from "../apiError.js";

const weapons: Map<number, Weapon> = new Map();
let siguienteId = 1;

export function listarWeapons(): Array<{ id: number; weapon: Weapon }> {
  return Array.from(weapons.entries()).map(([id, weapon]) => ({ id, weapon }));
}

export function buscarWeaponPorId(id: number): Weapon {
  const weapon = weapons.get(id);
  if (!weapon) {
    throw new ApiError(404, `Weapon con id ${id} no encontrado`);
  }
  return weapon;
}

export function crearWeapon(datos: CreateWeapon): { id: number; weapon: Weapon } {
  if (!datos.name) {
    throw new ApiError(400, "name es obligatorio");
  }

  const weapon = new Weapon(datos.name, datos.points, datos.compatibleUnitTypes);
  
  const id = siguienteId;
  siguienteId += 1;
  weapons.set(id, weapon);
  return { id, weapon };
}

export function actualizarWeapon(id: number, cambios: UpdateWeapon): Weapon {
  const weapon = buscarWeaponPorId(id);

  if (cambios.name !== undefined) {
    weapon.name = cambios.name;
  }
  if (cambios.points !== undefined) {
    weapon.points = cambios.points;
  }
  if (cambios.compatibleUnitTypes !== undefined) {
    weapon.compatibleUnitTypes = cambios.compatibleUnitTypes;
  }

  return weapon;
}

export function eliminarWeapon(id: number): void {
  if (!weapons.has(id)) {
    throw new ApiError(404, `Weapon con id ${id} no encontrado`);
  }
  weapons.delete(id);
}
