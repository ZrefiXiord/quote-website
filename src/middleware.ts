import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

interface UserPayload extends jose.JWTPayload{
    username: string,
    id: number
}

export async function middleware(req: NextRequest) {
    const token: string | undefined = (req.headers.get("authorization") || '').split("Bearer ").at(1);
    let headers;
    if (typeof token === 'undefined') {
        return NextResponse.json({
            message: "no access"
        }, { status: 401 });
    }
    try {
        const userVerified : jose.JWTVerifyResult<UserPayload>  = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_TOKEN));
        headers = new Headers(req.headers);
        headers.set("user", JSON.stringify({username: userVerified.payload.username, id: userVerified.payload.id}));
    } catch (error) {
        return NextResponse.json({
            message: "authentication failed"
        }, { status: 401 });
    }
    
    
    
    return NextResponse.next({
        request: {
            headers
        }
    });
}


export const config = {
    matcher: ['/api/create/:path*']
};