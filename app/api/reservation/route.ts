import { getCurrentUser } from "@/app/libs/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {
        startDate,
        endDate,
        totalPrice,
        userId,
        listingId
    } = await req.json()

    try {
        await prisma.reservation.create({
            data: {
                startDate,
                endDate,
                totalPrice,
                userId,
                listingId
            }
        })

        return NextResponse.json({ message: 'Reservation was created' }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ message: 'Failed to reserve' }, {
            status: 424
        })
    }
}

export async function DELETE() {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }
    try {
        await prisma.reservation.deleteMany({
            where: {
                OR: [{
                    userId: currentUser.id
                }, {
                    listing: {
                        userId: currentUser.id
                    }
                }]
            }
        })

        return NextResponse.json({ message: 'Reservation deleted' }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete' }, {
            status: 424
        })
    }
}