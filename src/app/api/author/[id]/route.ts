import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

type Params = {
    id: string
}

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: Params }) {
    let author;

    try {
        author = await prisma.author.findUniqueOrThrow({
            where: { id: parseInt(context.params.id) }
        });
    } catch (error) {
        return NextResponse.json({
            message: "author not found"
        }, { status: 404 });
    }

    return NextResponse.json({
        author
    }, { status: 200 });

}