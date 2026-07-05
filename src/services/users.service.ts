import { getAllUsers } from "../repository/user.repository.js";

export async function findAllUsersService(){
    const users= await getAllUsers();
    return users
}