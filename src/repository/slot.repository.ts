import { prisma } from "../config/database.js"

export async function findBookedSlotsByHostInDateRange(hostId: number, startDate: Date, endDate: Date){
    const slots= await prisma.slot.findMany({
        where: {
            hostId,
            date: {
                gte: startDate,
                lte: endDate
            },
            status: 'BOOKED'
        }
    })

    return slots
}