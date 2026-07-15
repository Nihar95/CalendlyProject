import { Router } from "express";
import { createUser, findAllusers, findUserById } from "../controllers/users.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../dto/user.dto.js";


export const userRouter: Router= Router(); // we will see the route after /users

userRouter.get('/',findAllusers)
userRouter.get('/:id', findUserById)
userRouter.post('/',validate(createUserSchema), createUser)