// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = await prisma.user.create({
            data: {
                name: body.username,
                email: body.email,
                password: hashedPassword,
                role: body.role || "USER"
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.error()
    }
}