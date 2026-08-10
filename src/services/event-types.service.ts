import slug from "slug";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dto/event_type.dto.js";
import { findByHostId, createEventTypeRepo, getById, checkSlugAvailability, removeEventType, findByHostandSlug, findActiveByHostIdAndEventSlug, updateEventTypeRepo } from "../repository/event-type-repository.js"
import { conflict, forbidden, notFound } from "../utils/api-error.js";
import { getUserById} from "../repository/user.repository.js"

export async function listEventTypes(hostId: number){
    const eventTypes= await findByHostId(hostId);
    return eventTypes
}

export async function getEventTypeById(hostId: number, id: number){
    const eventType = await getById(id);
    if(!eventType){
        throw notFound("Event type not found");
    }

    if(eventType.hostId !== hostId){
        throw forbidden("You are not authorized to access this event type");
    }

    return eventType;
}

export async function updateEventType(hostId: number, id: number, data: UpdateEventTypeDto){
    const eventType = await getById(id);
    if(!eventType){
        throw notFound("Event type not found");
    }

    if(eventType.hostId !== hostId){
        throw forbidden("You are not authorized to update this event type");
    }

    if(data.slug && data.slug !== eventType.slug){
        const existing = await findByHostandSlug(hostId, data.slug);
        if(existing){
            throw conflict("The slug is already in use, please use a different slug");
        }
    }

    return updateEventTypeRepo(id, data);
}

export async function createEventType(hostId: number, data: CreateEventTypeDto){
    const slugPassed = data.slug || slug(data.title, {lower: true});

    if(!slugPassed){
        throw conflict("Could not generate a slug for the event type");
    }

    const isSlugAvailable = await checkSlugAvailability(hostId, slugPassed);

    if(!isSlugAvailable){
        throw conflict("The slug is already in use, please use a different slug");
    }

    const eventType= await createEventTypeRepo(hostId, {...data, slug: slugPassed});
    return eventType
}
 
export async function removeEventTypeService(hostId: number, id: number){
    const eventType= await getById(id);
    if(!eventType){
        throw notFound("Event type not found");
    }

    if(eventType.hostId !== hostId){
        throw forbidden("You are not authorized to remove this event type");
    }

    return removeEventType(id);
}

export async function getEventTypePublic(hostId: number, eventSlug: string){
    const eventType= await findActiveByHostIdAndEventSlug(hostId, eventSlug);
    if(!eventType){
        throw notFound("Event type not found");
    }

    const host = await getUserById(hostId)

    if(!host){
        throw notFound("Host not found")
    }

    return {
        eventType: {
            id: eventType.id,
            title: eventType.title,
            description: eventType.description,
            durationInMins: eventType.durationInMins,
            locationType: eventType.locationType
        },
        host:{
            name: host.name,
            email: host.email
        }
    };
}