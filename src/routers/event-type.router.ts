import { Router } from "express";
import { create, getById, list, remove, update } from "../controllers/event-types.controller.js";
import { validate } from "../middlewares/validate.js";
import { requireUserId } from "../middlewares/require-user-id.js";
import { createEventTypeSchema, updateEventTypeSchema } from "../dto/event_type.dto.js";

export const eventTypeRouter: Router = Router();

eventTypeRouter.use(requireUserId);

eventTypeRouter.get("/", list);
eventTypeRouter.get("/:id", getById);
eventTypeRouter.post("/", validate(createEventTypeSchema), create);
eventTypeRouter.put("/:id", validate(updateEventTypeSchema), update);
eventTypeRouter.delete("/:id", remove);
