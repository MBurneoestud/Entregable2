export type Keyword = 'Infantry' | 'Battleline' | 'Mounted' | 'Vehicle' | 'Character';

export interface IWeapon {
    name: string;
    points: number;
    compatibleUnitTypes: Keyword[];
}

export class Weapon implements IWeapon {
    name: string;
    points: number;
    compatibleUnitTypes: Keyword[];

    constructor(name: string, points: number, compatibleUnitTypes: Keyword[]) {
        this.name = name;
        this.points = points;
        this.compatibleUnitTypes = compatibleUnitTypes;
    }

    isCompatibleWith(unitType: Keyword): boolean {
        return this.compatibleUnitTypes.includes(unitType);
    }
}