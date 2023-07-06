import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


export async function POST(req: Request) {
    const credentials = await req.json()

    const hashedPassword = await bcrypt.hash(credentials.password, 12)

    const user = await prisma.user.create({
        data: {
            name: credentials.name,
            email: credentials.email,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}