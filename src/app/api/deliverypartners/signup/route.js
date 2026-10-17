import { connectionSrt } from "@/lib/db";
import { deliveryPartnerSchema } from "@/lib/deliveryPartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    const payload = await req.json();
    let success = false;
    const user = new deliveryPartnerSchema(payload)
    const result = await user.save()
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success })
}