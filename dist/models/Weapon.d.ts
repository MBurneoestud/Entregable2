export interface IWeapon {
    name: string;
    points: number;
    compatibleUnitTypes: string[];
}
export declare class Weapon implements IWeapon {
    name: string;
    points: number;
    compatibleUnitTypes: string[];
    constructor(name: string, points: number, compatibleUnitTypes: string[]);
    isCompatibleWith(unitType: string): boolean;
}
//# sourceMappingURL=Weapon.d.ts.map