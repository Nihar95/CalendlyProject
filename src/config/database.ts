import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PORT } from "./env.js";

const adapter= new PrismaPg({
    connectionString: PORT.databaseUrl,
})

const prisma = new PrismaClient({
    adapter,
})

 export async function connectDatabase() {

    try{
        await prisma.$connect();
        console.log("Connected to database");

    }catch(error){
        console.error("Database failed to connect: ", error)
        process.exit()

    }
 }