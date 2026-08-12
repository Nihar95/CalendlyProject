import {
    CreateAvailabilityExceptionDto,
    CreateAvailabilityRuleDto,
    UpdateAvailabilityExceptionDto,
    UpdateAvailabilityRuleDto,
} from "../dto/availability.dto.js";
import {
    createException as createExceptionRepo,
    createRule as createRuleRepo,
    findExceptionsById,
    findExceptionsByUser,
    findRuleById,
    findRulesByUser,
    removeException as removeExceptionRepo,
    removeRule as removeRuleRepo,
    updateException as updateExceptionRepo,
    updateRule as updateRuleRepo,
} from "../repository/availability.repository.js";
import { forbidden, notFound } from "../utils/api-error.js";

export async function listRules(userId: number) {
    const rules = await findRulesByUser(userId);
    return rules;
}

export async function createRule(userId: number, data: CreateAvailabilityRuleDto) {
    const rule = await createRuleRepo(userId, data);
    return rule;
}

export async function removeRule(userId: number, ruleId: number) {
    const rule = await findRuleById(ruleId);
    if (!rule) {
        throw notFound("Availability rule not found");
    }

    if (rule.userId !== userId) {
        throw forbidden("You are not authorized to remove this availability rule");
    }

    return removeRuleRepo(ruleId);
}

export async function updateRule(
    ruleId: number,
    userId: number,
    data: UpdateAvailabilityRuleDto
) {
    const rule = await findRuleById(ruleId);
    if (!rule) {
        throw notFound("Availability rule not found");
    }

    if (rule.userId !== userId) {
        throw forbidden("You are not authorized to update this availability rule");
    }

    return updateRuleRepo(ruleId, data);
}

export async function listExceptions(userId: number) {
    const exceptions = await findExceptionsByUser(userId);
    return exceptions;
}

export async function createException(
    userId: number,
    data: CreateAvailabilityExceptionDto
) {
    const exception = await createExceptionRepo(userId, data);
    return exception;
}

export async function removeException(userId: number, exceptionId: number) {
    const exception = await findExceptionsById(exceptionId);
    if (!exception) {
        throw notFound("Availability exception not found");
    }

    if (exception.userId !== userId) {
        throw forbidden("You are not authorized to remove this availability exception");
    }

    return removeExceptionRepo(exceptionId);
}

export async function updateException(
    exceptionId: number,
    userId: number,
    data: UpdateAvailabilityExceptionDto
) {
    const exception = await findExceptionsById(exceptionId);
    if (!exception) {
        throw notFound("Availability exception not found");
    }

    if (exception.userId !== userId) {
        throw forbidden("You are not authorized to update this availability exception");
    }

    return updateExceptionRepo(exceptionId, data);
}
