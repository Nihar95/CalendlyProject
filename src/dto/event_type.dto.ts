import { title } from "node:process";
import z from "zod";

export const createEventTypeSchema= z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(1000).optional(),
    durationInMins: z.number().min(15).max(120).default(30),
    isActive: z.boolean().default(true),
    locationType: z.enum(['online','in-person']).default('online'),
    locationValue: z.string().optional(),
    bufferBeforeMinutes: z.number().min(0).max(120).default(0),
    bufferAfterMinutes: z.number().min(0).max(120).default(0),
    slug: z.string().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),

})
export const updateEventTypeSchema= createEventTypeSchema.partial()

export type CreateEventTypeDto= z.infer<typeof createEventTypeSchema>
export type UpdateEventTypeDto= z.infer<typeof updateEventTypeSchema>