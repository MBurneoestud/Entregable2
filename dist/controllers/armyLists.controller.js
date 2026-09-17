"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.listar = listar;
exports.obtenerPorId = obtenerPorId;
exports.crear = crear;
exports.actualizar = actualizar;
exports.eliminar = eliminar;
const armyListsService = __importStar(require("../services/armyLists.service.js"));
const apiError_js_1 = require("../apiError.js");
function listar(req, res, next) {
    try {
        const resultado = armyListsService.listarArmyLists();
        res.json({ total: resultado.length, armyLists: resultado, requestId: req.id });
    }
    catch (error) {
        next(error);
    }
}
function obtenerPorId(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            throw new apiError_js_1.ApiError(400, `"${req.params.id}" no es un id válido`);
        }
        const armyList = armyListsService.buscarArmyListPorId(id);
        res.json({ armyList, requestId: req.id });
    }
    catch (error) {
        next(error);
    }
}
function crear(req, res, next) {
    try {
        const nuevoArmyList = armyListsService.crearArmyList(req.body);
        res.status(201).json({ armyList: nuevoArmyList, requestId: req.id });
    }
    catch (error) {
        next(error);
    }
}
function actualizar(req, res, next) {
    try {
        const id = Number(req.params.id);
        const actualizado = armyListsService.actualizarArmyList(id, req.body);
        res.json({ armyList: actualizado, requestId: req.id });
    }
    catch (error) {
        next(error);
    }
}
function eliminar(req, res, next) {
    try {
        const id = Number(req.params.id);
        armyListsService.eliminarArmyList(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}
