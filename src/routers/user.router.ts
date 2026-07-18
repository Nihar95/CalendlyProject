import { Router } from "express";
import { createUser, deleteUser, findAllusers, findUserById, updateUser } from "../controllers/users.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../dto/user.dto.js";


export const userRouter: Router= Router(); // we will see the route after /users

userRouter.get('/',findAllusers)
userRouter.get('/:id', findUserById)
userRouter.post('/',validate(createUserSchema), createUser)
userRouter.put('/:id', validate(updateUserSchema), updateUser)
userRouter.delete('/:id', deleteUser)