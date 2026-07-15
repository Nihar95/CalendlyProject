import {z} from "zod"


export const createUserSchema= z.object({
    email: z.email("Invalid email id"),
    name: z.string().min(1,"Invalid User").max(100)
})

export type CreateUserDto= z.infer<typeof createUserSchema>