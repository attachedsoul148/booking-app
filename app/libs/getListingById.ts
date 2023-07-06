import prisma from "@/app/libs/prismadb"

export async function getListingById(id: string) {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id
            },
            include: {
                user: true,
                reservations: true
            }
        })

        if (!listing) {
            return null
        }

        return {
            ...listing, createdAt: listing?.createdAt.toISOString(), user: {
                ...listing?.user, createdAt: listing?.user?.createdAt.toISOString(),
                updatedAt: listing?.user?.updatedAt.toISOString(),
                emailVerified:
                    listing?.user?.emailVerified?.toISOString() || null
            },
            reservations: listing.reservations.map((reservation) => ({
                ...reservation, createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
            }))
        }
    } catch (error) {
        throw new Error('Failed to load listings by id')
    }
}