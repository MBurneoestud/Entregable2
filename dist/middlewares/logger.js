"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
function logger(req, res, next) {
    const inicio = Date.now();
    res.on("finish", () => {
        const duracionMs = Date.now() - inicio;
        console.log(`[${new Date().toISOString()}] id=${req.id} ${req.method} ${req.originalUrl} ` +
            `-> ${res.statusCode} (${duracionMs}ms)`);
    });
    next();
}
