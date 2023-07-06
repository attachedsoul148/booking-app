import { SavedListing } from "@/typed";
import prisma from "./prismadb";
import { getCurrentUser } from "./getCurrentUser";


export async function getListingsByUserId() {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new Error('No user, please login')
    }

    try {
        const listings = await prisma.listing.findMany({
            where: {
                userId: currentUser.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const savedListings: SavedListing[] = [...listings].map((listing) => ({
            ...listing, createdAt: listing.createdAt.toISOString()
        }))

        return savedListings
    } catch (error) {
        throw new Error('Failed to load listings by user id')
    }
}