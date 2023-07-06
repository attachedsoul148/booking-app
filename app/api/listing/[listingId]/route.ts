import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { listingId: string } }) {
    try {
        await prisma.listing.delete({
            where: {
                id: params.listingId
            }
        })

        return NextResponse.json({ message: 'Listing is deleted' }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete listing' }, {
            status: 424
        })
    }
}