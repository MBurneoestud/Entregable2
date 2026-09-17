"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarUnits = listarUnits;
exports.buscarUnitPorId = buscarUnitPorId;
exports.crearUnit = crearUnit;
exports.actualizarUnit = actualizarUnit;
exports.eliminarUnit = eliminarUnit;
const Unit_js_1 = require("../models/Unit.js");
const apiError_js_1 = require("../apiError.js");
const units = new Map();
let siguienteId = 1;
function listarUnits() {
    return Array.from(units.entries()).map(([id, unit]) => ({ id, unit }));
}
function buscarUnitPorId(id) {
    const unit = units.get(id);
    if (!unit) {
        throw new apiError_js_1.ApiError(404, `Unit con id ${id} no encontrado`);
    }
    return unit;
}
function crearUnit(datos) {
    if (!datos.name) {
        throw new apiError_js_1.ApiError(400, "name es obligatorio");
    }
    const unit = new Unit_js_1.Unit(datos.name, datos.basePoints, datos.keywords, datos.availableWeapons);
    const id = siguienteId;
    siguienteId += 1;
    units.set(id, unit);
    return { id, unit };
}
function actualizarUnit(id, cambios) {
    const unit = buscarUnitPorId(id);
    if (cambios.name !== undefined) {
        unit.name = cambios.name;
    }
    if (cambios.basePoints !== undefined) {
        unit.basePoints = cambios.basePoints;
    }
    if (cambios.keywords !== undefined) {
        unit.keywords = cambios.keywords;
    }
    if (cambios.availableWeapons !== undefined) {
        unit.availableWeapons = cambios.availableWeapons;
    }
    if (cambios.equippedWeapons !== undefined) {
        unit.equippedWeapons = cambios.equippedWeapons;
    }
    return unit;
}
function eliminarUnit(id) {
    if (!units.has(id)) {
        throw new apiError_js_1.ApiError(404, `Unit con id ${id} no encontrado`);
    }
    units.delete(id);
}
