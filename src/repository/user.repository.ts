import { prisma } from "../config/database.js";

export async function getAllUsers(){

    const users= await prisma.user.findMany();
    return users;

}