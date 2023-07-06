import { SavedListing } from "@/typed";
import prisma from "./prismadb";
import { eachDayOfInterval } from "date-fns";

export interface GetListingParams { guestCount?: string, roomCount?: string, bathroomCount?: string, location?: string, startDate?: string, endDate?: string }

export async function getListings(params: GetListingParams) {
    let query: any = {}

    if (params.guestCount) {
        query.guestCount = {
            gte: +params.guestCount
        }
    }
    if (params.roomCount) {
        query.roomCount = {
            gte: +params.roomCount
        }
    }
    if (params.bathroomCount) {
        query.bathroomCount = {
            gte: +params.bathroomCount
        }
    }
    if (params.location) {
        query.locationValue = params.location
    }

    if (params.startDate && params.endDate) {
        if (params.startDate !== params.endDate) {
            const SD = new Date(params.startDate)
            const ED = new Date(params.endDate)

            const dates = eachDayOfInterval({ start: SD, end: ED })

            query.NOT = {
                reservations: {
                    some: {
                        OR: [{
                            startDate: {
                                in: [...dates]
                            }
                        }, {
                            endDate: {
                                in: [...dates]
                            }
                        }]
                    }
                }
            }
        }
    }

    try {
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const savedListings: SavedListing[] = [...listings].map((listing) => ({
            ...listing, createdAt: listing.createdAt.toISOString()
        }))

        return savedListings
    } catch (error) {
        throw new Error('Failed to load listings')
    }
}