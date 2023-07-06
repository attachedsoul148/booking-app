import { getCurrentUser } from "@/app/libs/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function getFavorites() {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new Error('No user, please login')
    }

    try {
        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        })

        return favorites.map((fav) => ({
            ...fav,
            createdAt: fav.createdAt.toISOString()
        }))
    } catch (error) {
        throw new Error('Failed to load favorites')
    }
}
