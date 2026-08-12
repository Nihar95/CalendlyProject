import { Request, Response } from "express";
import {
    listRules,
    createRule,
    removeRule,
    updateRule,
    listExceptions,
    createException,
    removeException,
    updateException,
} from "../services/availability.service.js";
import { sendSuccess } from "../utils/api-response.js";

export async function listAvailabilityRules(req: Request, res: Response) {
    const rules = await listRules(req.userId!);
    sendSuccess(res, rules);
}

export async function createAvailabilityRule(req: Request, res: Response) {
    const rule = await createRule(req.userId!, req.body);
    sendSuccess(res, rule, 201, "Availability rule created successfully");
}

export async function updateAvailabilityRule(req: Request, res: Response) {
    const ruleId = Number(req.params.id);
    const rule = await updateRule(ruleId, req.userId!, req.body);
    sendSuccess(res, rule, 200, "Availability rule updated successfully");
}

export async function removeAvailabilityRule(req: Request, res: Response) {
    const ruleId = Number(req.params.id);
    await removeRule(req.userId!, ruleId);
    sendSuccess(res, null, 200, "Availability rule removed successfully");
}

export async function listAvailabilityExceptions(req: Request, res: Response) {
    const exceptions = await listExceptions(req.userId!);
    sendSuccess(res, exceptions);
}

export async function createAvailabilityException(req: Request, res: Response) {
    const exception = await createException(req.userId!, req.body);
    sendSuccess(res, exception, 201, "Availability exception created successfully");
}

export async function updateAvailabilityException(req: Request, res: Response) {
    const exceptionId = Number(req.params.id);
    const exception = await updateException(exceptionId, req.userId!, req.body);
    sendSuccess(res, exception, 200, "Availability exception updated successfully");
}

export async function removeAvailabilityException(req: Request, res: Response) {
    const exceptionId = Number(req.params.id);
    await removeException(req.userId!, exceptionId);
    sendSuccess(res, null, 200, "Availability exception removed successfully");
}
