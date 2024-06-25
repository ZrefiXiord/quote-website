import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import * as jose from 'jose';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();
    if (data.username && data.password) {
        const user = await prisma.user.findUnique({
            where: {
                username: data.username
            }
        })

        if (user && bcrypt.compareSync(data.password, user.password)) {
            //const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_TOKEN, {expiresIn: "1d"})
            const token = await new jose.SignJWT({ username: user.username, id: user.id })
                .setExpirationTime("1d")
                .setIssuedAt()
                .setProtectedHeader({alg: "HS256"})
                .sign(new TextEncoder().encode(process.env.JWT_TOKEN))
            return NextResponse.json({
                message: token
            }, {
                status: 200
            });
        } else {
            return NextResponse.json({
                message: "invalid password or username"
            }, {
                status: 401
            });
        }
    }
}