import { connectionSrt } from "@/lib/db";
import { userSchema } from "@/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function POST(req) {
    let success = false;
    const payload = await req.json();
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    let result = await userSchema.findOne({ email: payload.email, password: payload.password })
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}



