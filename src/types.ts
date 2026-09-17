import type { IArmyList } from "./models/ArmyList.js";
import type { IUnit } from "./models/Unit.js";
import type { IWeapon } from "./models/Weapon.js";

export { ArmyList, IArmyList, IKeywordLimits, IPointLimit } from "./models/ArmyList.js";
export { Unit, IUnit } from "./models/Unit.js";
export { Weapon, IWeapon } from "./models/Weapon.js";
export type { Keyword } from "./models/Weapon.js";

export type CreateArmyList = Omit<IArmyList, "units">;
export type UpdateArmyList = Partial<IArmyList>;
export type CreateUnit = Omit<IUnit, "equippedWeapons">;
export type UpdateUnit = Partial<IUnit>;
export type CreateWeapon = Omit<IWeapon, never>;
export type UpdateWeapon = Partial<IWeapon>;