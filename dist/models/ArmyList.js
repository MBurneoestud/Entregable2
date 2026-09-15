import { Unit } from "./Unit.js";
export class ArmyList {
    name;
    units;
    pointLimit;
    keywordLimits;
    constructor(name) {
        this.name = name;
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
    getTotalPoints() {
        return this.units.reduce((sum, unit) => sum + unit.getTotalPoints(), 0);
    }
    isValidPointCost() {
        const total = this.getTotalPoints();
        return total >= this.pointLimit.min && total <= this.pointLimit.max;
    }
    countUnitsByKeyword(keyword) {
        return this.units.filter(unit => unit.hasKeyword(keyword)).length;
    }
    canAddUnit(unit) {
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
    hasCharacter() {
        return this.countUnitsByKeyword('Character') > 0;
    }
    addUnit(unit) {
        if (!this.canAddUnit(unit)) {
            return false;
        }
        this.units.push(unit);
        return true;
    }
    getDisplayString() {
        let output = `\n=== ${this.name} ===\n`;
        output += `Total Points: ${this.getTotalPoints()} / ${this.pointLimit.max}\n`;
        output += `Units: ${this.units.length}\n\n`;
        this.units.forEach((unit, index) => {
            output += `${index + 1}. ${unit.getDisplayString()}\n`;
        });
        output += `\nKeyword Counts:\n`;
        for (const [keyword, limit] of Object.entries(this.keywordLimits)) {
            const count = this.countUnitsByKeyword(keyword);
            output += `  ${keyword}: ${count}/${limit}\n`;
        }
        return output;
    }
    isValid() {
        return this.hasCharacter() && this.isValidPointCost();
    }
}
//# sourceMappingURL=ArmyList.js.map