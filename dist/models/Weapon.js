export class Weapon {
    name;
    points;
    compatibleUnitTypes;
    constructor(name, points, compatibleUnitTypes) {
        this.name = name;
        this.points = points;
        this.compatibleUnitTypes = compatibleUnitTypes;
    }
    isCompatibleWith(unitType) {
        return this.compatibleUnitTypes.includes(unitType);
    }
}
//# sourceMappingURL=Weapon.js.map