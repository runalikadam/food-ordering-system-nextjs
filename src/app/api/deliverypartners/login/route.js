import { connectionSrt } from "@/lib/db";
import { deliveryPartnerSchema } from "@/lib/deliveryPartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function POST(req) {
    let success = false;
    const payload = await req.json();
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    let result = await deliveryPartnerSchema.findOne({ mobile: payload.loginMobile, password: payload.loginPassword })
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}



