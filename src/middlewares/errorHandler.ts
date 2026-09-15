import { Request, Response, NextFunction } from "express";
import { ApiError } from "../apiError";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
): void {
    const status = err instanceof ApiError ? err.status : 500;
    const message = err instanceof Error ? err.message: "Internal server error";

    if (status === 500) {
        console.error(`[${new Date().toISOString()}] id=${req.id} ERROR:`, err);
    }

    res.status(status).json({
        error: message,
        requestId: req.id,
    });
}