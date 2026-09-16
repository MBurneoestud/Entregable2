import { spaceMarinesUnits } from "../data/SpaceMarinesData.js";
import { Unit } from "../models/Unit.js";
import type { IUnit } from "../models/Unit.js";
import { ApiError } from "../apiError.js";
import type { CreateUnitRequest, EquipWeaponRequest } from "../types.js";
import "../types.js";

let nextUnitId = spaceMarinesUnits.length + 1;

let units: Unit[] = [...spaceMarinesUnits];

export function listUnits(keyword?: string): Unit[] {
  if (!keyword) return units;
  return units.filter((unit) => unit.hasKeyword(keyword));
}

export function getUnitById(id: number): Unit {
  const unit = units.find((u) => u.name === getUnitNameById(id));
  if (!unit) {
    throw new ApiError(404, `Unit with id ${id} not found`);
  }
  return unit;
}

function getUnitNameById(id: number): string {
  if (id < 1 || id > units.length) {
    throw new ApiError(404, `Unit with id ${id} not found`);
  }
  return units[id - 1].name;
}

export function createUnit(data: CreateUnitRequest): Unit {
  if (!data.name || !data.basePoints || !data.keywords) {
    throw new ApiError(400, "name, basePoints, and keywords are required");
  }

  if (data.basePoints < 0) {
    throw new ApiError(400, "basePoints must be non-negative");
  }

  if (!Array.isArray(data.keywords) || data.keywords.length === 0) {
    throw new ApiError(400, "keywords must be a non-empty array");
  }

  const newUnit = new Unit(data.name, data.basePoints, data.keywords);
  units.push(newUnit);
  nextUnitId++;
  return newUnit;
}

export function updateUnit(id: number, data: Partial<IUnit>): Unit {
  const unit = getUnitById(id);
  
  if (data.name !== undefined) unit.name = data.name;
  if (data.basePoints !== undefined) {
    if (data.basePoints < 0) {
      throw new ApiError(400, "basePoints must be non-negative");
    }
    unit.basePoints = data.basePoints;
  }
  if (data.keywords !== undefined) {
    if (!Array.isArray(data.keywords) || data.keywords.length === 0) {
      throw new ApiError(400, "keywords must be a non-empty array");
    }
    unit.keywords = data.keywords;
  }

  const index = units.findIndex((u) => u.name === unit.name);
  units[index] = unit;
  return unit;
}

export function deleteUnit(id: number): void {
  const unit = getUnitById(id);
  const index = units.findIndex((u) => u.name === unit.name);
  if (index === -1) {
    throw new ApiError(404, `Unit with id ${id} not found`);
  }
  units.splice(index, 1);
}

export function equipWeaponToUnit(unitId: number, weaponName: string): Unit {
  const unit = getUnitById(unitId);

  const weapon = unit.availableWeapons.find((w) => w.name === weaponName);
  if (!weapon) {
    throw new ApiError(400, `Weapon "${weaponName}" not available for this unit`);
  }

  const success = unit.equipWeapon(weapon);
  if (!success) {
    throw new ApiError(400, `Weapon "${weaponName}" is not compatible with this unit`);
  }

  return unit;
}