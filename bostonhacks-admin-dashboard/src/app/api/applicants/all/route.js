import prisma from "../../../../../lib/prisma";

export const GET = async(request, { params }) => {
    try {
        const applicants = await prisma.applicant.findMany();
        prisma.$disconnect()
        return new Response(JSON.stringify(applicants), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}