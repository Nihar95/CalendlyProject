import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/api-error.js";
import { prisma } from "../config/database.js";

export async function requireUserId(req: Request, _res: Response, next: NextFunction) {
    const userIdHeader = req.headers["x-user-id"];

    if (!userIdHeader) {
        throw unauthorized("Missing x-user-id header");
    }

    const userId = Number(Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader);

    if (Number.isNaN(userId)) {
        throw unauthorized("Invalid x-user-id header");
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw unauthorized("User not found");
    }

    req.userId = userId;
    next();
}