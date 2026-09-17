"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearApp = crearApp;
const express_1 = __importDefault(require("express"));
const requestId_js_1 = require("./middlewares/requestId.js");
const logger_js_1 = require("./middlewares/logger.js");
const errorHandler_js_1 = require("./middlewares/errorHandler.js");
const apiError_js_1 = require("./apiError.js");
const armyLists_routes_js_1 = require("./routes/armyLists.routes.js");
const units_routes_js_1 = require("./routes/units.routes.js");
const weapons_routes_js_1 = require("./routes/weapons.routes.js");
function crearApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(requestId_js_1.requestId);
    app.use(logger_js_1.logger);
    app.get("/api/salud", (req, res) => {
        res.json({ estado: "ok", requestId: req.id });
    });
    app.use("/api/armylists", armyLists_routes_js_1.armyListsRouter);
    app.use("/api/units", units_routes_js_1.unitsRouter);
    app.use("/api/weapons", weapons_routes_js_1.weaponsRouter);
    app.use((req, res, next) => {
        next(new apiError_js_1.ApiError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
    });
    app.use(errorHandler_js_1.errorHandler);
    return app;
}
