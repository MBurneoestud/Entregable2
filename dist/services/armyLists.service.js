"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarArmyLists = listarArmyLists;
exports.buscarArmyListPorId = buscarArmyListPorId;
exports.crearArmyList = crearArmyList;
exports.actualizarArmyList = actualizarArmyList;
exports.eliminarArmyList = eliminarArmyList;
const ArmyList_js_1 = require("../models/ArmyList.js");
const apiError_js_1 = require("../apiError.js");
const armyLists = new Map();
let siguienteId = 1;
function listarArmyLists() {
    return Array.from(armyLists.entries()).map(([id, armyList]) => ({ id, armyList }));
}
function buscarArmyListPorId(id) {
    const armyList = armyLists.get(id);
    if (!armyList) {
        throw new apiError_js_1.ApiError(404, `Army list con id ${id} no encontrado`);
    }
    return armyList;
}
function crearArmyList(datos) {
    if (!datos.name) {
        throw new apiError_js_1.ApiError(400, "name es obligatorio");
    }
    const armyList = new ArmyList_js_1.ArmyList(datos.name, datos.faction);
    armyList.pointLimit = datos.pointLimit || armyList.pointLimit;
    armyList.keywordLimits = datos.keywordLimits || armyList.keywordLimits;
    const id = siguienteId;
    siguienteId += 1;
    armyLists.set(id, armyList);
    return { id, armyList };
}
function actualizarArmyList(id, cambios) {
    const armyList = buscarArmyListPorId(id);
    if (cambios.name !== undefined) {
        armyList.name = cambios.name;
    }
    if (cambios.faction !== undefined) {
        armyList.faction = cambios.faction;
    }
    if (cambios.pointLimit !== undefined) {
        armyList.pointLimit = cambios.pointLimit;
    }
    if (cambios.keywordLimits !== undefined) {
        armyList.keywordLimits = cambios.keywordLimits;
    }
    if (cambios.units !== undefined) {
        armyList.units = cambios.units;
    }
    return armyList;
}
function eliminarArmyList(id) {
    if (!armyLists.has(id)) {
        throw new apiError_js_1.ApiError(404, `Army list con id ${id} no encontrado`);
    }
    armyLists.delete(id);
}
