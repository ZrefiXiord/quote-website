import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();
    if (data.username && data.password) {
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(data.password, salt);

        try{
            const newUser = await prisma.user.create({
                data: {
                    username: data.username,
                    password: hashedPassword
                }
            });
        } catch(error) {
            return NextResponse.json({
                message: "Username already used"
            }, {
                status: 500
            });
        }
    }
    return NextResponse.json({
        message: "User created"
    }, {
        status: 200
    });
}