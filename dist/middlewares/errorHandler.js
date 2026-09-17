"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const apiError_js_1 = require("../apiError.js");
function errorHandler(err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) {
    const status = err instanceof apiError_js_1.ApiError ? err.status : 500;
    const mensaje = err instanceof Error ? err.message : "Error interno del servidor";
    if (status === 500) {
        console.error(`[${new Date().toISOString()}] id=${req.id} ERROR:`, err);
    }
    res.status(status).json({
        error: mensaje,
        requestId: req.id,
    });
}
