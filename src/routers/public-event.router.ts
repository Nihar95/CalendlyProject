import { Router } from "express";
import { getPublicEventTypes } from "../controllers/event-types.controller.js";
import { requireUserId } from "../middlewares/require-user-id.js";

export const publicEventRouter: Router = Router();

publicEventRouter.use(requireUserId);

publicEventRouter.get("/:slug", getPublicEventTypes);
