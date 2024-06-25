import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const quotes = await prisma.quote.findMany({
        select: {
            likesNumber: true,
            dislikesNumber: true,
            content: true,
            author: true,
            id: true,
            reporter: {
                select: {
                    username: true,
                    id: true
                }
            }
        }
    });

    return NextResponse.json({
        quotes
    }, { status: 200 });

}