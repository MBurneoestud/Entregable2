import { Weapon } from "./Weapon.js";
export interface IUnit {
    name: string;
    basePoints: number;
    keywords: string[];
    availableWeapons: Weapon[];
    equippedWeapons: Weapon[];
}
export declare class Unit implements IUnit {
    name: string;
    basePoints: number;
    keywords: string[];
    availableWeapons: Weapon[];
    equippedWeapons: Weapon[];
    constructor(name: string, basePoints: number, keywords: string[], availableWeapons?: Weapon[]);
    getTotalPoints(): number;
    hasKeyword(keyword: string): boolean;
    equipWeapon(weapon: Weapon): boolean;
    getDisplayString(): string;
}
//# sourceMappingURL=Unit.d.ts.map