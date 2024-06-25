import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();

    if (data['quote'] && data['authorId'] && typeof data['authorId'] === 'number') {
        console.log(data);
        try {
            const user  = JSON.parse(req.headers.get("user") || '{}')
            const newQuote = await prisma.quote.create({
                data: {
                    content: data['quote'],
                    authorId: data['authorId'],
                    reporterId: user.id
                }
            });
        } catch (error) {
            console.log(error);
            return NextResponse.json({
                message: "unable to create quote"
            }, { status: 500 });
        }
    }

    return NextResponse.json({
        message: "coucoucoucoc"
    }, { status: 200 });

}