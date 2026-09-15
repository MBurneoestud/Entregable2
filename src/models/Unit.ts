import { Weapon } from "./Weapon.js";
import type { Keyword } from "./Weapon.js";

export interface IUnit {
    name: string;
    basePoints: number;
    keywords: Keyword[];
    availableWeapons: Weapon[];
    equippedWeapons: Weapon[];
}

export class Unit implements IUnit {
    name: string;
    basePoints: number;
    keywords: Keyword[];
    availableWeapons: Weapon[];
    equippedWeapons: Weapon[];

    constructor(name: string, basePoints: number, keywords: Keyword[], availableWeapons: Weapon[] = []) {
        this.name = name;
        this.basePoints = basePoints;
        this.keywords = keywords;
        this.availableWeapons = availableWeapons;
        this.equippedWeapons = [];
    }

    getTotalPoints(): number {
        const weaponPoints = this.equippedWeapons.reduce((sum, weapon) => sum + weapon.points, 0);
        return this.basePoints + weaponPoints;
    }

    hasKeyword(keyword: Keyword): boolean {
        return this.keywords.includes(keyword);
    }

    equipWeapon(weapon: Weapon): boolean {
        if (this.keywords.length === 0 || !weapon.isCompatibleWith(this.keywords[0])) {
            return false;
        }
        this.equippedWeapons.push(weapon);
        return true;
    }

    getDisplayString(): string {
        const weaponNames = this.equippedWeapons.map(w => w.name).join(', ') || 'None';
        return `${this.name} (${this.getTotalPoints()} pts) - Weapons: [${weaponNames}]`;
    }
}