import { getAllUsers, getUserById } from "../repository/user.repository.js";
import { notFound } from "../utils/api-error.js";

export async function findAllUsersService(){
    const users= await getAllUsers();
    return users
}

export async function findUserByIdService(id: number){
    const users= await getUserById(id);
    if(!users){
        // throw new Error('User not found by this [id] id')
        throw notFound("User not Found")
    }
    return users
}