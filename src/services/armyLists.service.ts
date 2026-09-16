import { ArmyList } from "../models/ArmyList.js";
import type { IArmyList, IKeywordLimits, IPointLimit } from "../models/ArmyList.js";
import { Unit } from "../models/Unit.js";
import { ApiError } from "../apiError.js";
import type { CreateArmyListRequest, AddUnitToListRequest } from "../types.js";
import * as unitsService from "./units.service.js";
import "../types.js";

let nextArmyListId = 1;

let armyLists: ArmyList[] = [];

export function listArmyLists(): ArmyList[] {
  return armyLists;
}

export function getArmyListById(id: number): ArmyList {
  if (id < 1 || id > armyLists.length) {
    throw new ApiError(404, `Army list with id ${id} not found`);
  }
  return armyLists[id - 1];
}

export function createArmyList(data: CreateArmyListRequest): ArmyList {
  if (!data.name) {
    throw new ApiError(400, "name is required");
  }

  const armyList = new ArmyList(data.name);

  if (data.pointLimit) {
    if (data.pointLimit.min !== undefined) {
      if (data.pointLimit.min < 0) {
        throw new ApiError(400, "pointLimit.min must be non-negative");
      }
      armyList.pointLimit.min = data.pointLimit.min;
    }
    if (data.pointLimit.max !== undefined) {
      if (data.pointLimit.max < 0) {
        throw new ApiError(400, "pointLimit.max must be non-negative");
      }
      armyList.pointLimit.max = data.pointLimit.max;
    }
  }

  if (data.keywordLimits) {
    for (const [keyword, limit] of Object.entries(data.keywordLimits)) {
      if (keyword in armyList.keywordLimits) {
        (armyList.keywordLimits as unknown as Record<string, number>)[keyword] = limit;
      }
    }
  }

  armyLists.push(armyList);
  nextArmyListId++;
  return armyList;
}

export function updateArmyList(id: number, data: Partial<IArmyList>): ArmyList {
  const armyList = getArmyListById(id);
  
  if (data.name !== undefined) armyList.name = data.name;
  if (data.pointLimit !== undefined) {
    if (data.pointLimit.min !== undefined) {
      if (data.pointLimit.min < 0) {
        throw new ApiError(400, "pointLimit.min must be non-negative");
      }
      armyList.pointLimit.min = data.pointLimit.min;
    }
    if (data.pointLimit.max !== undefined) {
      if (data.pointLimit.max < 0) {
        throw new ApiError(400, "pointLimit.max must be non-negative");
      }
      armyList.pointLimit.max = data.pointLimit.max;
    }
  }
  if (data.keywordLimits !== undefined) {
    for (const [keyword, limit] of Object.entries(data.keywordLimits)) {
      if (keyword in armyList.keywordLimits) {
        (armyList.keywordLimits as unknown as Record<string, number>)[keyword] = limit;
      }
    }
  }

  const index = armyLists.findIndex((al) => al.name === armyList.name);
  armyLists[index] = armyList;
  return armyList;
}

export function deleteArmyList(id: number): void {
  const armyList = getArmyListById(id);
  const index = armyLists.findIndex((al) => al.name === armyList.name);
  if (index === -1) {
    throw new ApiError(404, `Army list with id ${id} not found`);
  }
  armyLists.splice(index, 1);
}

export function addUnitToArmyList(armyListId: number, data: AddUnitToListRequest): ArmyList {
  const armyList = getArmyListById(armyListId);
  
  if (!data.unitName) {
    throw new ApiError(400, "unitName is required");
  }

  // Find the unit by name in the available units
  const unit = unitsService.listUnits().find((u) => u.name === data.unitName);
  if (!unit) {
    throw new ApiError(404, `Unit "${data.unitName}" not found`);
  }

  // Create a copy of the unit to add to the army list
  const unitCopy = new Unit(unit.name, unit.basePoints, [...unit.keywords], [...unit.availableWeapons]);
  unitCopy.equippedWeapons = [...unit.equippedWeapons];

  const success = armyList.addUnit(unitCopy);
  if (!success) {
    throw new ApiError(400, `Cannot add unit "${data.unitName}" to army list: keyword limits exceeded`);
  }

  return armyList;
}

export function validateArmyList(id: number): { isValid: boolean; hasCharacter: boolean; totalPoints: number; withinPointLimit: boolean } {
  const armyList = getArmyListById(id);
  
  return {
    isValid: armyList.isValid(),
    hasCharacter: armyList.hasCharacter(),
    totalPoints: armyList.getTotalPoints(),
    withinPointLimit: armyList.isValidPointCost()
  };
}