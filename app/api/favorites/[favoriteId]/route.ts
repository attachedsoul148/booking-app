import { getCurrentUser } from "@/app/libs/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface Params {
    favoriteId: string
}

export async function POST(request: Request, { params }: { params: Params }) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    try {
        await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds: [...(currentUser.favoriteIds || []), params.favoriteId]
            }
        })

        return NextResponse.json({ message: 'Favorite added' }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ message: 'Error while adding favorite' }, {
            status: 424
        })
    }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error();
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter((id) => id !== params.favoriteId)

    try {
        await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        })

        return NextResponse.json({ message: `Favorite deleted , ${params.favoriteId}` }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ message: `Error while deleting favorite, ${params.favoriteId}` }, {
            status: 424
        })
    }
}