import type { IUnit, Unit} from './models/Unit.js';
import type { IWeapon, Weapon} from './models/Weapon.js';
import type { IArmyList, IKeywordLimits, IPointLimit, ArmyList } from './models/ArmyList.js';

export type { IUnit, IWeapon, IArmyList, IKeywordLimits, IPointLimit};
export { Unit, Weapon, ArmyList };

export interface CreateUnitRequest {
    name: string;
    basePoints: number;
    keywords: string[];
    availableWeapons?: string[];
}

export interface CreateWeaponRequest {
    name: string;
    points: number;
    compatibleUnitTypes: string[];
}

export interface CreateArmyListRequest {
    name: string;
    pointLimit?: {
        min?: number;
        max?: number;
    };
    keywordLimits?: Partial<IKeywordLimits>;
}

export interface AddUnitToListRequest {
    unitName: string;
}

export interface EquipWeaponRequest {
    weaponName: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface UnitResponse {
    id: string;
    name: string;
    basePoints: number;
    keywords: string[];
    availableWeapons: string[];
    equippedWeapons: string[];
    totalPoints: number;
}

export interface WeaponResponse {
    id: string;
    name: string;
    points: number;
    compatibleUnitTypes: string[];
}

export interface ArmyListResponse {
    id: string;
    name: string;
    units: UnitResponse[];
    pointLimit: IPointLimit;
    keywordLimits: IKeywordLimits;
    totalPoints: number;
    isValid: boolean;
    hasCharacter: boolean;
}

export interface UnitParams {
    unitId: string;
}

export interface ArmyListParams {
    armyListId: string;
}

declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}
