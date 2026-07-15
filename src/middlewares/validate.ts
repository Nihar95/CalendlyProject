import {Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { badRequest } from "../utils/api-error.js";

export const validate= (schema: ZodSchema)=>
    (req: Request,_res: Response, next: NextFunction)=>{

        const result= schema.safeParse(req.body)

        if(!result.success){
            throw badRequest("Validation Failed", result.error.issues)
        }

        //validation passes
        req.body= result.data

        next() // calling controller with  validated data
}
