"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weapon = void 0;
class Weapon {
    constructor(name, points, compatibleUnitTypes) {
        this.name = name;
        this.points = points;
        this.compatibleUnitTypes = compatibleUnitTypes;
    }
    isCompatibleWith(unitType) {
        return this.compatibleUnitTypes.includes(unitType);
    }
}
exports.Weapon = Weapon;
