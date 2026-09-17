"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaceMarinesUnits = exports.spaceMarinesWeapons = void 0;
const Weapon_js_1 = require("../models/Weapon.js");
const Unit_js_1 = require("../models/Unit.js");
exports.spaceMarinesWeapons = [
    new Weapon_js_1.Weapon('Boltgun', 0, ['Battleline', 'Character']),
    new Weapon_js_1.Weapon('Bolt Pistol', 0, ['Battleline', 'Character', 'Mounted']),
    new Weapon_js_1.Weapon('Chainsword', 0, ['Battleline', 'Character', 'Mounted']),
    new Weapon_js_1.Weapon('Power Sword', 5, ['Battleline', 'Character', 'Infantry']),
    new Weapon_js_1.Weapon('Power Fist', 10, ['Battleline', 'Infantry', 'Character']),
    new Weapon_js_1.Weapon('Plasma Pistol', 5, ['Infantry', 'Battleline', 'Character']),
    new Weapon_js_1.Weapon('Meltagun', 10, ['Infantry', 'Character']),
    new Weapon_js_1.Weapon('Plasma Gun', 10, ['Infantry']),
    new Weapon_js_1.Weapon('Flamer', 8, ['Infantry', 'Battleline']),
    new Weapon_js_1.Weapon('Heavy Bolter', 10, ['Infantry', 'Battleline', 'Mounted']),
    new Weapon_js_1.Weapon('Lightning Claws', 5, ['Infantry', 'Character']),
    new Weapon_js_1.Weapon('Autocannon', 15, ['Infantry']),
    // Vehicle Weapons
    new Weapon_js_1.Weapon('Twin Heavy Bolter', 15, ['Vehicle']),
    new Weapon_js_1.Weapon('Multi-Melta', 25, ['Vehicle', 'Mounted']),
    new Weapon_js_1.Weapon('Heavy Plasma Cannon', 30, ['Vehicle']),
    new Weapon_js_1.Weapon('Assault Cannon', 20, ['Vehicle']),
    new Weapon_js_1.Weapon('Hunter/Killer Missile Launcher', 10, ['Vehicle']),
    new Weapon_js_1.Weapon('Heavy Flamer', 12, ['Vehicle']),
    new Weapon_js_1.Weapon('Ironhail Heavy Stubber', 15, ['Vehicle']),
    new Weapon_js_1.Weapon('Twin Lascannon', 35, ['Vehicle']),
    //Mounted unit Weapons
    new Weapon_js_1.Weapon('Onslaught Gattling Cannon', 10, ['Mounted']),
    new Weapon_js_1.Weapon('Twin Bolt Rifle', 5, ['Mounted']),
];
exports.spaceMarinesUnits = [
    //Battleline Units
    new Unit_js_1.Unit('Intercessor Squad', 80, ['Battleline'], [
        exports.spaceMarinesWeapons[0], exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2],
        exports.spaceMarinesWeapons[3], exports.spaceMarinesWeapons[4], exports.spaceMarinesWeapons[5],
        exports.spaceMarinesWeapons[8], exports.spaceMarinesWeapons[9]
    ]),
    new Unit_js_1.Unit('Assault Intercessor Squad', 75, ['Battleline'], [
        exports.spaceMarinesWeapons[0], exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2],
        exports.spaceMarinesWeapons[3], exports.spaceMarinesWeapons[4], exports.spaceMarinesWeapons[5],
        exports.spaceMarinesWeapons[8], exports.spaceMarinesWeapons[9]
    ]),
    new Unit_js_1.Unit('Heavy Intercessor Squad', 100, ['Battleline'], [
        exports.spaceMarinesWeapons[0], exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2],
        exports.spaceMarinesWeapons[3], exports.spaceMarinesWeapons[4], exports.spaceMarinesWeapons[5],
        exports.spaceMarinesWeapons[8], exports.spaceMarinesWeapons[9]
    ]),
    //Infantry Units
    new Unit_js_1.Unit('Terminator Squad', 160, ['Infantry'], [
        exports.spaceMarinesWeapons[5], exports.spaceMarinesWeapons[6], exports.spaceMarinesWeapons[7],
        exports.spaceMarinesWeapons[8], exports.spaceMarinesWeapons[9], exports.spaceMarinesWeapons[10],
        exports.spaceMarinesWeapons[11]
    ]),
    new Unit_js_1.Unit('Assault Terminator Squad', 180, ['Infantry'], [
        exports.spaceMarinesWeapons[5], exports.spaceMarinesWeapons[6], exports.spaceMarinesWeapons[7],
        exports.spaceMarinesWeapons[8], exports.spaceMarinesWeapons[9], exports.spaceMarinesWeapons[10],
        exports.spaceMarinesWeapons[11]
    ]),
    new Unit_js_1.Unit('Aggressor Squad', 80, ['Infantry'], [
        exports.spaceMarinesWeapons[5], exports.spaceMarinesWeapons[6], exports.spaceMarinesWeapons[7],
        exports.spaceMarinesWeapons[8], exports.spaceMarinesWeapons[9], exports.spaceMarinesWeapons[10],
        exports.spaceMarinesWeapons[11]
    ]),
    new Unit_js_1.Unit('Bladeguard Veteran Squad', 80, ['Infantry'], [
        exports.spaceMarinesWeapons[5], exports.spaceMarinesWeapons[6], exports.spaceMarinesWeapons[7],
        exports.spaceMarinesWeapons[8], exports.spaceMarinesWeapons[9], exports.spaceMarinesWeapons[10],
        exports.spaceMarinesWeapons[11]
    ]),
    //Character Units
    new Unit_js_1.Unit('Captain', 80, ['Character'], [
        exports.spaceMarinesWeapons[0], exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2],
        exports.spaceMarinesWeapons[3], exports.spaceMarinesWeapons[4], exports.spaceMarinesWeapons[5],
        exports.spaceMarinesWeapons[6], exports.spaceMarinesWeapons[10]
    ]),
    new Unit_js_1.Unit('Librarian', 70, ['Character'], [
        exports.spaceMarinesWeapons[0], exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2],
        exports.spaceMarinesWeapons[3], exports.spaceMarinesWeapons[4], exports.spaceMarinesWeapons[5],
        exports.spaceMarinesWeapons[6], exports.spaceMarinesWeapons[10]
    ]),
    new Unit_js_1.Unit('Apothecary', 40, ['Character'], [
        exports.spaceMarinesWeapons[0], exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2],
        exports.spaceMarinesWeapons[3], exports.spaceMarinesWeapons[4], exports.spaceMarinesWeapons[5],
        exports.spaceMarinesWeapons[6], exports.spaceMarinesWeapons[10]
    ]),
    new Unit_js_1.Unit('Techmarine', 55, ['Character'], [
        exports.spaceMarinesWeapons[0], exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2],
        exports.spaceMarinesWeapons[3], exports.spaceMarinesWeapons[4], exports.spaceMarinesWeapons[5],
        exports.spaceMarinesWeapons[6], exports.spaceMarinesWeapons[10]
    ]),
    //Vehicle Units
    new Unit_js_1.Unit('Astraeus', 525, ['Vehicle'], [
        exports.spaceMarinesWeapons[12], exports.spaceMarinesWeapons[13], exports.spaceMarinesWeapons[14],
        exports.spaceMarinesWeapons[15], exports.spaceMarinesWeapons[16], exports.spaceMarinesWeapons[17],
        exports.spaceMarinesWeapons[18], exports.spaceMarinesWeapons[19]
    ]),
    new Unit_js_1.Unit('Dreadnought', 135, ['Vehicle'], [
        exports.spaceMarinesWeapons[12], exports.spaceMarinesWeapons[13], exports.spaceMarinesWeapons[14],
        exports.spaceMarinesWeapons[15], exports.spaceMarinesWeapons[16], exports.spaceMarinesWeapons[17],
        exports.spaceMarinesWeapons[18], exports.spaceMarinesWeapons[19]
    ]),
    new Unit_js_1.Unit('Gladiator Reaper', 160, ['Vehicle'], [
        exports.spaceMarinesWeapons[12], exports.spaceMarinesWeapons[13], exports.spaceMarinesWeapons[14],
        exports.spaceMarinesWeapons[15], exports.spaceMarinesWeapons[16], exports.spaceMarinesWeapons[17],
        exports.spaceMarinesWeapons[18], exports.spaceMarinesWeapons[19]
    ]),
    new Unit_js_1.Unit('Land Raider', 220, ['Vehicle'], [
        exports.spaceMarinesWeapons[12], exports.spaceMarinesWeapons[13], exports.spaceMarinesWeapons[14],
        exports.spaceMarinesWeapons[15], exports.spaceMarinesWeapons[16], exports.spaceMarinesWeapons[17],
        exports.spaceMarinesWeapons[18], exports.spaceMarinesWeapons[19]
    ]),
    //Mounted Units
    new Unit_js_1.Unit('Invader ATV', 60, ['Mounted'], [
        exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2], exports.spaceMarinesWeapons[9],
        exports.spaceMarinesWeapons[13], exports.spaceMarinesWeapons[20], exports.spaceMarinesWeapons[21]
    ]),
    new Unit_js_1.Unit('Outrider Squad', 60, ['Mounted'], [
        exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2], exports.spaceMarinesWeapons[9],
        exports.spaceMarinesWeapons[13], exports.spaceMarinesWeapons[20], exports.spaceMarinesWeapons[21]
    ]),
    new Unit_js_1.Unit('Bike Squad', 60, ['Mounted'], [
        exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2], exports.spaceMarinesWeapons[9],
        exports.spaceMarinesWeapons[13], exports.spaceMarinesWeapons[20], exports.spaceMarinesWeapons[21]
    ]),
    new Unit_js_1.Unit('Company Veterans on Bikes', 60, ['Mounted'], [
        exports.spaceMarinesWeapons[1], exports.spaceMarinesWeapons[2], exports.spaceMarinesWeapons[9],
        exports.spaceMarinesWeapons[13], exports.spaceMarinesWeapons[20], exports.spaceMarinesWeapons[21]
    ]),
];
