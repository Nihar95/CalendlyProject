import { Router } from "express";
import { findAllusers, findUserById } from "../controllers/users.controller.js";


export const userRouter: Router= Router(); // we will see the route after /users

userRouter.get('/',findAllusers)
userRouter.get('/:id', findUserById)