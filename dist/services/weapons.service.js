"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarWeapons = listarWeapons;
exports.buscarWeaponPorId = buscarWeaponPorId;
exports.crearWeapon = crearWeapon;
exports.actualizarWeapon = actualizarWeapon;
exports.eliminarWeapon = eliminarWeapon;
const Weapon_js_1 = require("../models/Weapon.js");
const apiError_js_1 = require("../apiError.js");
const weapons = new Map();
let siguienteId = 1;
function listarWeapons() {
    return Array.from(weapons.entries()).map(([id, weapon]) => ({ id, weapon }));
}
function buscarWeaponPorId(id) {
    const weapon = weapons.get(id);
    if (!weapon) {
        throw new apiError_js_1.ApiError(404, `Weapon con id ${id} no encontrado`);
    }
    return weapon;
}
function crearWeapon(datos) {
    if (!datos.name) {
        throw new apiError_js_1.ApiError(400, "name es obligatorio");
    }
    const weapon = new Weapon_js_1.Weapon(datos.name, datos.points, datos.compatibleUnitTypes);
    const id = siguienteId;
    siguienteId += 1;
    weapons.set(id, weapon);
    return { id, weapon };
}
function actualizarWeapon(id, cambios) {
    const weapon = buscarWeaponPorId(id);
    if (cambios.name !== undefined) {
        weapon.name = cambios.name;
    }
    if (cambios.points !== undefined) {
        weapon.points = cambios.points;
    }
    if (cambios.compatibleUnitTypes !== undefined) {
        weapon.compatibleUnitTypes = cambios.compatibleUnitTypes;
    }
    return weapon;
}
function eliminarWeapon(id) {
    if (!weapons.has(id)) {
        throw new apiError_js_1.ApiError(404, `Weapon con id ${id} no encontrado`);
    }
    weapons.delete(id);
}
