import prisma from '../../../../lib/prisma';
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const data = await req.json();
    const newApplicant = await prisma.applicant.create({
      data
    });
    return new NextResponse(JSON.stringify(newApplicant), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error adding new applicant:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to add new applicant', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
