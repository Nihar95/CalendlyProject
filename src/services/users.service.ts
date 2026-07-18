import { CreateUserDto } from "../dto/user.dto.js";
import { getAllUsers, getUserByEmail, getUserById } from "../repository/user.repository.js";
import { conflict, notFound } from "../utils/api-error.js";
import { createUser } from "../repository/user.repository.js";

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

export async function findUserByEmailService(email: string){
    const users= await getUserByEmail(email);
    if(!users){
        // throw new Error('User not found by this [id] id')
        throw notFound('User not Found with this ${email}')
    }
    return users
}

export async function createUserService(data: CreateUserDto){
    // Check user exsist or not
    const existingUser= await getUserByEmail(data.email)
    if(existingUser){
        throw conflict("User already exsist with this ${data.email}")
    }
    return createUser(data)

}