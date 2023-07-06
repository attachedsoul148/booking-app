import { getCurrentUser } from "@/app/libs/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const {
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        title,
        description
    } = await req.json()

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new Error('No current user, you need to be logged in!')
    }
    const listing = await prisma.listing.create({
        data: {
            category,
            locationValue: location.label,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price: parseInt(price, 10),
            title,
            description,
            userId: currentUser?.id
        }
    })

    return NextResponse.json(listing, { status: 200 })
}