import { Request, Response } from "express";
import {
    listEventTypes,
    getEventTypeById,
    createEventType,
    updateEventType,
    removeEventTypeService,
    getEventTypePublic,
} from "../services/event-types.service.js";
import { sendSuccess } from "../utils/api-response.js";

export async function list(req: Request, res: Response) {
    const eventTypes = await listEventTypes(req.userId!);
    sendSuccess(res, eventTypes);
}

export async function getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const eventType = await getEventTypeById(req.userId!, id);
    sendSuccess(res, eventType);
}

export async function create(req: Request, res: Response) {
    const eventType = await createEventType(req.userId!, req.body);
    sendSuccess(res, eventType, 201, "Event type created successfully");
}

export async function update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const eventType = await updateEventType(req.userId!, id, req.body);
    sendSuccess(res, eventType, 200, "Event type updated successfully");
}

export async function remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await removeEventTypeService(req.userId!, id);
    sendSuccess(res, null, 200, "Event type removed successfully");
}

export async function getPublicEventTypes(req: Request, res: Response) {
    const slug = String(req.params.slug);
    const eventType = await getEventTypePublic(req.userId!, slug);
    sendSuccess(res, eventType);
}
