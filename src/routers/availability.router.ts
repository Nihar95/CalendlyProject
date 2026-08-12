import { Router } from "express";
import {
    listAvailabilityRules,
    createAvailabilityRule,
    updateAvailabilityRule,
    removeAvailabilityRule,
    listAvailabilityExceptions,
    createAvailabilityException,
    updateAvailabilityException,
    removeAvailabilityException,
} from "../controllers/availability.controller.js";
import { validate } from "../middlewares/validate.js";
import { requireUserId } from "../middlewares/require-user-id.js";
import {
    createAvailabilityRuleSchema,
    updateAvailabilityRuleSchema,
    createAvailabilityExceptionSchema,
    updateAvailabilityExceptionSchema,
} from "../dto/availability.dto.js";

export const availabilityRouter: Router = Router();

availabilityRouter.use(requireUserId);

availabilityRouter.get("/rules", listAvailabilityRules);
availabilityRouter.post("/rules", validate(createAvailabilityRuleSchema), createAvailabilityRule);
availabilityRouter.put("/rules/:id", validate(updateAvailabilityRuleSchema), updateAvailabilityRule);
availabilityRouter.delete("/rules/:id", removeAvailabilityRule);

availabilityRouter.get("/exceptions", listAvailabilityExceptions);
availabilityRouter.post(
    "/exceptions",
    validate(createAvailabilityExceptionSchema),
    createAvailabilityException
);
availabilityRouter.put(
    "/exceptions/:id",
    validate(updateAvailabilityExceptionSchema),
    updateAvailabilityException
);
availabilityRouter.delete("/exceptions/:id", removeAvailabilityException);
