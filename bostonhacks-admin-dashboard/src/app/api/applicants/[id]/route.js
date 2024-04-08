import { PrismaClient } from "@prisma/client";

// GET /applicants/id
export const GET = async(request, { params }) => {
    try {
        const prisma = new PrismaClient()
        const applicant = await prisma.Applicant.findUnique({
            where: {
            id: parseInt(params.id),
            },
        })
        prisma.$disconnect()
        return {
            status: 200,
            body: applicant,
        }
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message },
        }
    }
    
}