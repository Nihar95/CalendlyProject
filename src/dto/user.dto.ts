import {z} from "zod"


export const createUserSchema= z.object({
    email: z.email("Invalid email id"),
    name: z.string().min(1,"Invalid User").max(100),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export type CreateUserDto= z.infer<typeof createUserSchema>