import { prisma } from "../config/database.js";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dto/event_type.dto.js";

export async function findByHostId(hostId: number) {
    const event_Type= await prisma.eventType.findMany({
        where: {
            hostId
        },orderBy:{
            createdAt: 'desc'
        }
    })

    return event_Type
}

export async function getById(id: number){
    const eventType= await prisma.eventType.findUnique({
        where:{
            id
        }
    })

    return eventType
}

export async function create(hostId: number, data: CreateEventTypeDto){
    const event_Type= await prisma.eventType.create({
        data: { 
        hostId,
        ...data
        }
    });

    return event_Type
}

export async function update(id: number, data: UpdateEventTypeDto){
    const update_event_Type= await prisma.eventType.update({
        where: {id},
        data: data
    })

    return update_event_Type
}

export async function remove(id: number){
    await prisma.eventType.delete({
        where: {id}
    });
}

export async function findByHostandSlug( hostId: number, slug: string){
    const eventType= await prisma.eventType.findFirst({
        where: {
            hostId,
            slug
        }
    })

    return eventType
}