import { prisma } from "../config/database.js";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dto/event_type.dto.js";
import { notFound } from "../utils/api-error.js";

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

// explore intersection of & for more knowledge
export async function createEventTypeRepo(hostId: number, data: CreateEventTypeDto & { slug: string }){
    const event_Type= await prisma.eventType.create({
        data: { 
        hostId,
        ...data
        }
    });

    return event_Type
}

export async function updateEventTypeRepo(id: number, data: UpdateEventTypeDto){
    const update_event_Type= await prisma.eventType.update({
        where: {id},
        data: data
    })

    return update_event_Type
}

export async function removeEventType(id: number){
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

export async function findActiveByHostIdAndEventSlug(hostId: number, eventSlug: string){
    const host = await prisma.user.findUnique({
        where: {
            id: hostId,
        },
    });

    if (!host) {
        throw notFound("Host not found");
    }

    const eventType = await prisma.eventType.findFirst({
        where: {
            isActive: true,
            hostId,
            slug: eventSlug,
        },
    });

    return eventType;
}

// check if the slug is already used by an active event type for the same host
export async function checkSlugAvailability(hostId: number, slug: string){
    const exsistingEventType= await prisma.eventType.findFirst({
        where: {
            hostId,
            slug,
        }
    })

    return exsistingEventType === null
}