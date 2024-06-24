import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

type Params = {
    id: string
}

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: Params }) {
    let quote;
    let author;
    let reporter;
    let responseQuote;
    try {
        quote = await prisma.quote.findUniqueOrThrow({
            where: { id: parseInt(context.params.id) }
        });
        author = await prisma.author.findUnique({
            where: { id: quote.authorId}
        });
        reporter = await prisma.user.findUnique({
            where: { id: quote.reporterId}
        });

        responseQuote = {
            id: quote.id,
            content: quote.content,
            authorName: author?.name,
            authorId: quote.authorId,
            reporterName: reporter?.username,
            reporterId: quote.reporterId
        }
    } catch (error) {
        return NextResponse.json({
            message: "quote doesnt exist"
        }, { status: 404 })
    }


    return NextResponse.json({
        responseQuote
    }, { status: 200 });

}