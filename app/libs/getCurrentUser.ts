import prisma from './prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]/route';


export async function getCurrentUser() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return null
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user) {
            return null
        }

        return {
            ...user,
            createdAt: user?.createdAt.toISOString(),
            updatedAt: user?.updatedAt.toISOString(),
            emailVerified:
                user?.emailVerified?.toISOString() || null,
        }
    } catch (error) {
        return null
    }
}