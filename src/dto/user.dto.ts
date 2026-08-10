import slug from "slug"
import {z} from "zod"


export const createUserSchema= z.object({
    email: z.email("Invalid email id"),
    name: z.string().min(1,"Invalid User").max(100),
    password: z.string().min(8, "Password must be at least 8 characters"),
    slug: z.string().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
})

export type CreateUserDto= z.infer<typeof createUserSchema>

export const updateUserSchema= createUserSchema.partial().refine(
    (data)=> Object.keys(data).length > 0,
    { message: "At least one field must be provided" }
)

export type UpdateUserDto= z.infer<typeof updateUserSchema>