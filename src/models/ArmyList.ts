import { Unit } from "./Unit.js";
import type { Keyword } from "./Weapon.js";

export interface IKeywordLimits {
    Infantry: number;
    Battleline: number;
    Mounted: number;
    Vehicle: number;
    Character: number;
}

export interface IPointLimit {
    min: number;
    max: number;
}

export interface IArmyList {
    name: string;
    faction: string;
    units: Unit[];
    pointLimit: IPointLimit;
    keywordLimits: IKeywordLimits;
}

export class ArmyList implements IArmyList {
    name: string;
    faction: string;
    units: Unit[];
    pointLimit: IPointLimit;
    keywordLimits: IKeywordLimits;

    constructor(name: string, faction: string = 'Space Marines') {
        this.name = name;
        this.faction = faction;
        this.units = [];
        this.pointLimit = { min: 500, max: 1000 };
        this.keywordLimits = {
            Infantry: 5,
            Battleline: 10,
            Mounted: 4,
            Vehicle: 2,
            Character: 1
        };
    }

    getTotalPoints(): number {
        return this.units.reduce((sum, unit) => sum + unit.getTotalPoints(), 0);
    }

    isValidPointCost(): boolean {
        const total = this.getTotalPoints();
        return total >= this.pointLimit.min && total <= this.pointLimit.max;
    }

    countUnitsByKeyword(keyword: Keyword): number {
        return this.units.filter(unit => unit.hasKeyword(keyword)).length;
    }

    canAddUnit(unit: Unit): boolean {
        for (const keyword of unit.keywords) {
            if (this.keywordLimits[keyword] !== undefined) {
                const currentCount = this.countUnitsByKeyword(keyword);
                if (currentCount >= this.keywordLimits[keyword]) {
                    return false;
                }
            }
        }
        return true;
    }

    hasCharacter(): boolean {
        return this.countUnitsByKeyword('Character' as Keyword) > 0;
    }

    addUnit(unit: Unit): boolean {
        if (!this.canAddUnit(unit)) {
            return false;
        }
        this.units.push(unit);
        return true;
    }

    getDisplayString(): string {
        let output = `\n=== ${this.name} ===\n`;
        output += `Total Points: ${this.getTotalPoints()} / ${this.pointLimit.max}\n`;
        output += `Units: ${this.units.length}\n\n`;

        this.units.forEach((unit, index) => {
            output += `${index + 1}. ${unit.getDisplayString()}\n`;
        });

        output += `\nKeyword Counts:\n`;
        for (const [keyword, limit] of Object.entries(this.keywordLimits)) {
            const count = this.countUnitsByKeyword(keyword as Keyword);
            output += `  ${keyword}: ${count}/${limit}\n`;
        }

        return output;
    }

    isValid(): boolean {
        return this.hasCharacter() && this.isValidPointCost();
    }
}