import { Weapon } from "../models/Weapon.js";
import { Unit } from "../models/Unit.js";
export const spaceMarinesWeapons = [
    new Weapon('Boltgun', 0, ['Battleline', 'Character']),
    new Weapon('Bolt Pistol', 0, ['Battleline', 'Character', 'Mounted']),
    new Weapon('Chainsword', 0, ['Battleline', 'Character', 'Mounted']),
    new Weapon('Power Sword', 5, ['Battleline', 'Character', 'Infantry']),
    new Weapon('Power Fist', 10, ['Battleline', 'Infantry', 'Character']),
    new Weapon('Plasma Pistol', 5, ['Infantry', 'Battleline', 'Character']),
    new Weapon('Meltagun', 10, ['Infantry', 'Character']),
    new Weapon('Plasma Gun', 10, ['Infantry']),
    new Weapon('Flamer', 8, ['Infantry', 'Battleline']),
    new Weapon('Heavy Bolter', 10, ['Infantry', 'Battleline', 'Mounted']),
    new Weapon('Lightning Claws', 5, ['Infantry', 'Character']),
    new Weapon('Autocannon', 15, ['Infantry']),
    // Vehicle Weapons
    new Weapon('Twin Heavy Bolter', 15, ['Vehicle']),
    new Weapon('Multi-Melta', 25, ['Vehicle', 'Mounted']),
    new Weapon('Heavy Plasma Cannon', 30, ['Vehicle']),
    new Weapon('Assault Cannon', 20, ['Vehicle']),
    new Weapon('Hunter/Killer Missile Launcher', 10, ['Vehicle']),
    new Weapon('Heavy Flamer', 12, ['Vehicle']),
    new Weapon('Ironhail Heavy Stubber', 15, ['Vehicle']),
    new Weapon('Twin Lascannon', 35, ['Vehicle']),
    //Mounted unit Weapons
    new Weapon('Onslaught Gattling Cannon', 10, ['Mounted']),
    new Weapon('Twin Bolt Rifle', 5, ['Mounted']),
];
export const spaceMarinesUnits = [
    //Battleline Units
    new Unit('Intercessor Squad', 80, ['Battleline'], [
        spaceMarinesWeapons[0], spaceMarinesWeapons[1], spaceMarinesWeapons[2],
        spaceMarinesWeapons[3], spaceMarinesWeapons[4], spaceMarinesWeapons[5],
        spaceMarinesWeapons[8], spaceMarinesWeapons[9]
    ]),
    new Unit('Assault Intercessor Squad', 75, ['Battleline'], [
        spaceMarinesWeapons[0], spaceMarinesWeapons[1], spaceMarinesWeapons[2],
        spaceMarinesWeapons[3], spaceMarinesWeapons[4], spaceMarinesWeapons[5],
        spaceMarinesWeapons[8], spaceMarinesWeapons[9]
    ]),
    new Unit('Heavy Intercessor Squad', 100, ['Battleline'], [
        spaceMarinesWeapons[0], spaceMarinesWeapons[1], spaceMarinesWeapons[2],
        spaceMarinesWeapons[3], spaceMarinesWeapons[4], spaceMarinesWeapons[5],
        spaceMarinesWeapons[8], spaceMarinesWeapons[9]
    ]),
    //Infantry Units
    new Unit('Terminator Squad', 160, ['Infantry'], [
        spaceMarinesWeapons[5], spaceMarinesWeapons[6], spaceMarinesWeapons[7],
        spaceMarinesWeapons[8], spaceMarinesWeapons[9], spaceMarinesWeapons[10],
        spaceMarinesWeapons[11]
    ]),
    new Unit('Assault Terminator Squad', 180, ['Infantry'], [
        spaceMarinesWeapons[5], spaceMarinesWeapons[6], spaceMarinesWeapons[7],
        spaceMarinesWeapons[8], spaceMarinesWeapons[9], spaceMarinesWeapons[10],
        spaceMarinesWeapons[11]
    ]),
    new Unit('Aggressor Squad', 80, ['Infantry'], [
        spaceMarinesWeapons[5], spaceMarinesWeapons[6], spaceMarinesWeapons[7],
        spaceMarinesWeapons[8], spaceMarinesWeapons[9], spaceMarinesWeapons[10],
        spaceMarinesWeapons[11]
    ]),
    new Unit('Bladeguard Veteran Squad', 80, ['Infantry'], [
        spaceMarinesWeapons[5], spaceMarinesWeapons[6], spaceMarinesWeapons[7],
        spaceMarinesWeapons[8], spaceMarinesWeapons[9], spaceMarinesWeapons[10],
        spaceMarinesWeapons[11]
    ]),
    //Character Units
    new Unit('Captain', 80, ['Character'], [
        spaceMarinesWeapons[0], spaceMarinesWeapons[1], spaceMarinesWeapons[2],
        spaceMarinesWeapons[3], spaceMarinesWeapons[4], spaceMarinesWeapons[5],
        spaceMarinesWeapons[6], spaceMarinesWeapons[10]
    ]),
    new Unit('Librarian', 70, ['Character'], [
        spaceMarinesWeapons[0], spaceMarinesWeapons[1], spaceMarinesWeapons[2],
        spaceMarinesWeapons[3], spaceMarinesWeapons[4], spaceMarinesWeapons[5],
        spaceMarinesWeapons[6], spaceMarinesWeapons[10]
    ]),
    new Unit('Apothecary', 40, ['Character'], [
        spaceMarinesWeapons[0], spaceMarinesWeapons[1], spaceMarinesWeapons[2],
        spaceMarinesWeapons[3], spaceMarinesWeapons[4], spaceMarinesWeapons[5],
        spaceMarinesWeapons[6], spaceMarinesWeapons[10]
    ]),
    new Unit('Techmarine', 55, ['Character'], [
        spaceMarinesWeapons[0], spaceMarinesWeapons[1], spaceMarinesWeapons[2],
        spaceMarinesWeapons[3], spaceMarinesWeapons[4], spaceMarinesWeapons[5],
        spaceMarinesWeapons[6], spaceMarinesWeapons[10]
    ]),
    //Vehicle Units
    new Unit('Astraeus', 525, ['Vehicle'], [
        spaceMarinesWeapons[12], spaceMarinesWeapons[13], spaceMarinesWeapons[14],
        spaceMarinesWeapons[15], spaceMarinesWeapons[16], spaceMarinesWeapons[17],
        spaceMarinesWeapons[18], spaceMarinesWeapons[19]
    ]),
    new Unit('Dreadnought', 135, ['Vehicle'], [
        spaceMarinesWeapons[12], spaceMarinesWeapons[13], spaceMarinesWeapons[14],
        spaceMarinesWeapons[15], spaceMarinesWeapons[16], spaceMarinesWeapons[17],
        spaceMarinesWeapons[18], spaceMarinesWeapons[19]
    ]),
    new Unit('Gladiator Reaper', 160, ['Vehicle'], [
        spaceMarinesWeapons[12], spaceMarinesWeapons[13], spaceMarinesWeapons[14],
        spaceMarinesWeapons[15], spaceMarinesWeapons[16], spaceMarinesWeapons[17],
        spaceMarinesWeapons[18], spaceMarinesWeapons[19]
    ]),
    new Unit('Land Raider', 220, ['Vehicle'], [
        spaceMarinesWeapons[12], spaceMarinesWeapons[13], spaceMarinesWeapons[14],
        spaceMarinesWeapons[15], spaceMarinesWeapons[16], spaceMarinesWeapons[17],
        spaceMarinesWeapons[18], spaceMarinesWeapons[19]
    ]),
    //Mounted Units
    new Unit('Invader ATV', 60, ['Mounted'], [
        spaceMarinesWeapons[1], spaceMarinesWeapons[2], spaceMarinesWeapons[9],
        spaceMarinesWeapons[13], spaceMarinesWeapons[20], spaceMarinesWeapons[21]
    ]),
    new Unit('Outrider Squad', 60, ['Mounted'], [
        spaceMarinesWeapons[1], spaceMarinesWeapons[2], spaceMarinesWeapons[9],
        spaceMarinesWeapons[13], spaceMarinesWeapons[20], spaceMarinesWeapons[21]
    ]),
    new Unit('Bike Squad', 60, ['Mounted'], [
        spaceMarinesWeapons[1], spaceMarinesWeapons[2], spaceMarinesWeapons[9],
        spaceMarinesWeapons[13], spaceMarinesWeapons[20], spaceMarinesWeapons[21]
    ]),
    new Unit('Company Veterans on Bikes', 60, ['Mounted'], [
        spaceMarinesWeapons[1], spaceMarinesWeapons[2], spaceMarinesWeapons[9],
        spaceMarinesWeapons[13], spaceMarinesWeapons[20], spaceMarinesWeapons[21]
    ]),
];
//# sourceMappingURL=SpaceMarinesData.js.map