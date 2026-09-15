import { Unit } from "./Unit.js";
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
    units: Unit[];
    pointLimit: IPointLimit;
    keywordLimits: IKeywordLimits;
}
export declare class ArmyList implements IArmyList {
    name: string;
    units: Unit[];
    pointLimit: IPointLimit;
    keywordLimits: IKeywordLimits;
    constructor(name: string);
    getTotalPoints(): number;
    isValidPointCost(): boolean;
    countUnitsByKeyword(keyword: string): number;
    canAddUnit(unit: Unit): boolean;
    hasCharacter(): boolean;
    addUnit(unit: Unit): boolean;
    getDisplayString(): string;
    isValid(): boolean;
}
//# sourceMappingURL=ArmyList.d.ts.map