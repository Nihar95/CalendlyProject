import { prisma } from "../config/database.js";
import {
    CreateAvailabilityExceptionDto,
    CreateAvailabilityRuleDto,
    UpdateAvailabilityExceptionDto,
    UpdateAvailabilityRuleDto,
} from "../dto/availability.dto.js";

export async function findRulesByUser(userId: number) {
    return prisma.availablityRule.findMany({
        where: { userId },
        orderBy: [{ weekday: "asc" }, { startTime: "asc" }],
    });
}

export async function findActiveRulesByUser(userId: number) {
    return prisma.availablityRule.findMany({
        where: { userId },
        orderBy: [{ weekday: "asc" }, { startTime: "asc" }],
    });
}

export async function findRuleById(id: number) {
    return prisma.availablityRule.findUnique({
        where: { id },
    });
}

export async function createRule(userId: number, data: CreateAvailabilityRuleDto) {
    const { isActive: _isActive, weekday, ...rest } = data;
    return prisma.availablityRule.create({
        data: {
            userId,
            weekday: String(weekday),
            ...rest,
        },
    });
}

export async function updateRule(id: number, data: UpdateAvailabilityRuleDto) {
    const { isActive: _isActive, weekday, ...rest } = data;
    return prisma.availablityRule.update({
        where: { id },
        data: {
            ...rest,
            ...(weekday !== undefined && { weekday: String(weekday) }),
        },
    });
}

export async function removeRule(id: number) {
    await prisma.availablityRule.delete({
        where: { id },
    });
}

export async function findExceptionsByUser(userId: number) {
    return prisma.availablityException.findMany({
        where: { userId },
        orderBy: { date: "asc" },
    });
}

export async function findExceptionsById(id: number) {
    return prisma.availablityException.findUnique({
        where: { id },
    });
}

export async function createException(userId: number, data: CreateAvailabilityExceptionDto) {
    const { date, ...rest } = data;
    return prisma.availablityException.create({
        data: {
            userId,
            ...rest,
            date: new Date(`${date}T00:00:00.000Z`),
        },
    });
}

export async function updateException(id: number, data: UpdateAvailabilityExceptionDto) {
    const { date, ...rest } = data;
    return prisma.availablityException.update({
        where: { id },
        data: {
            ...rest,
            ...(date !== undefined && { date: new Date(`${date}T00:00:00.000Z`) }),
        },
    });
}

export async function removeException(id: number) {
    await prisma.availablityException.delete({
        where: { id },
    });
}

export async function findExceptionsByUserInRange(
    userId: number,
    startDate: Date,
    endDate: Date
) {
    return prisma.availablityException.findMany({
        where: {
            userId,
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
        orderBy: { date: "asc" },
    });
}
