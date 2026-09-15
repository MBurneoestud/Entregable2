import { Weapon } from "./Weapon.js";
export class Unit {
    name;
    basePoints;
    keywords;
    availableWeapons;
    equippedWeapons;
    constructor(name, basePoints, keywords, availableWeapons = []) {
        this.name = name;
        this.basePoints = basePoints;
        this.keywords = keywords;
        this.availableWeapons = availableWeapons;
        this.equippedWeapons = [];
    }
    getTotalPoints() {
        const weaponPoints = this.equippedWeapons.reduce((sum, weapon) => sum + weapon.points, 0);
        return this.basePoints + weaponPoints;
    }
    hasKeyword(keyword) {
        return this.keywords.includes(keyword);
    }
    equipWeapon(weapon) {
        if (this.keywords.length === 0 || !weapon.isCompatibleWith(this.keywords[0])) {
            return false;
        }
        this.equippedWeapons.push(weapon);
        return true;
    }
    getDisplayString() {
        const weaponNames = this.equippedWeapons.map(w => w.name).join(', ') || 'None';
        return `${this.name} (${this.getTotalPoints()} pts) - Weapons: [${weaponNames}]`;
    }
}
//# sourceMappingURL=Unit.js.map