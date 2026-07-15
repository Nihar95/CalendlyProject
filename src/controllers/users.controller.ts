import { Request, Response } from 'express'
import { findAllUsersService, findUserByIdService } from '../services/users.service.js'
import { sendSuccess } from '../utils/api-response.js';

export async function findAllusers(_req: Request, res: Response){
    const response=  await findAllUsersService();
    //res.json(response)
    sendSuccess(res,response)
}

export async function findUserById(req: Request, res: Response){
    const {id}= req.params
    const response=  await findUserByIdService(Number(id));
    //res.json(response)
    sendSuccess(res,response)

}

export async function createUser(req: Request, res: Response){

    res.json({});

}