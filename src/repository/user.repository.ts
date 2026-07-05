import { prisma } from "../config/database.js";

export async function getAllUsers(){

    const users= await prisma.user.findMany();
    return users;

}

export async function getUserById(id: number) {
    const user= await prisma.user.findUnique({
        where: {
            id
        }
    });
     return user;
}