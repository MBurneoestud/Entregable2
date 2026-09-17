"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestId = requestId;
const crypto_1 = __importDefault(require("crypto"));
function requestId(req, res, next) {
    req.id = crypto_1.default.randomUUID();
    res.setHeader("X-Request-Id", req.id);
    next();
}
