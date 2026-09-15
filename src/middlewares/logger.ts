import type { Request, Response, NextFunction} from "express";

export function logger(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();

    res.on("finish", () => {
        const durationMs = Date.now() - start;
        console.log(
            `[${new Date().toISOString()}] id =${req.id} ${req.method} ${req.originalUrl} ` +  `-> ${res.statusCode} (${durationMs}ms)`
        );
    });
    next();
}