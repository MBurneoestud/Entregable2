import { spaceMarinesWeapons } from "../data/SpaceMarinesData.js";
import { Weapon } from "../models/Weapon.js";
import type { IWeapon } from "../models/Weapon.js";
import { ApiError } from "../apiError.js";
import type { CreateWeaponRequest } from "../types.js";
import "../types.js";

let nextWeaponId = spaceMarinesWeapons.length + 1;

let weapons: Weapon[] = [...spaceMarinesWeapons];

export function listWeapons(compatibleType?: string): Weapon[] {
  if (!compatibleType) return weapons;
  return weapons.filter((weapon) => weapon.isCompatibleWith(compatibleType));
}

export function getWeaponById(id: number): Weapon {
  if (id < 1 || id > weapons.length) {
    throw new ApiError(404, `Weapon with id ${id} not found`);
  }
  return weapons[id - 1];
}

export function createWeapon(data: CreateWeaponRequest): Weapon {
  if (!data.name || data.points === undefined || !data.compatibleUnitTypes) {
    throw new ApiError(400, "name, points, and compatibleUnitTypes are required");
  }

  if (data.points < 0) {
    throw new ApiError(400, "points must be non-negative");
  }

  if (!Array.isArray(data.compatibleUnitTypes) || data.compatibleUnitTypes.length === 0) {
    throw new ApiError(400, "compatibleUnitTypes must be a non-empty array");
  }

  const newWeapon = new Weapon(data.name, data.points, data.compatibleUnitTypes);
  weapons.push(newWeapon);
  nextWeaponId++;
  return newWeapon;
}

export function updateWeapon(id: number, data: Partial<IWeapon>): Weapon {
  const weapon = getWeaponById(id);
  
  if (data.name !== undefined) weapon.name = data.name;
  if (data.points !== undefined) {
    if (data.points < 0) {
      throw new ApiError(400, "points must be non-negative");
    }
    weapon.points = data.points;
  }
  if (data.compatibleUnitTypes !== undefined) {
    if (!Array.isArray(data.compatibleUnitTypes) || data.compatibleUnitTypes.length === 0) {
      throw new ApiError(400, "compatibleUnitTypes must be a non-empty array");
    }
    weapon.compatibleUnitTypes = data.compatibleUnitTypes;
  }

  const index = weapons.findIndex((w) => w.name === weapon.name);
  weapons[index] = weapon;
  return weapon;
}

export function deleteWeapon(id: number): void {
  const weapon = getWeaponById(id);
  const index = weapons.findIndex((w) => w.name === weapon.name);
  if (index === -1) {
    throw new ApiError(404, `Weapon with id ${id} not found`);
  }
  weapons.splice(index, 1);
}