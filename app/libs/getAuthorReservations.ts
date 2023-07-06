import { getCurrentUser } from "./getCurrentUser";
import prisma from "./prismadb";

export async function getAuthorReservations() {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        throw new Error('No user, please login')
    }

    try {
        const reservations = await prisma.reservation.findMany({
            where: {
                listing: {
                    userId: currentUser.id
                }
            },
            include: {
                listing: true
            }
        })

        return reservations.map((reservation) => ({
            ...reservation, createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing, createdAt: reservation.listing.createdAt.toISOString()
            }
        }))
    } catch (error) {
        throw new Error('No reservations')
    }
}