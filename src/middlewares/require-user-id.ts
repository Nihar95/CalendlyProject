import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/api-error.js";
import { string } from "zod";

export function requireUserId(req: Request, _res: Response, next: NextFunction) {
    const userIdHeader = req.headers["x-user-id"];

    if (!userIdHeader) {
        throw unauthorized("Missing x-user-id header");
    }

    const userId = Number(Array.isArray(userIdHeader) && typeof userIdHeader !== 'string' ? userIdHeader[0] : userIdHeader);

    if (Number.isNaN(userId)) {
        throw unauthorized("Invalid x-user-id header");
    }

    req.userId = userId;
    next();
}
