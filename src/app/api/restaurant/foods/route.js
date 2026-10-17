import { connectionSrt } from "@/lib/db";
import { foodSchema } from "@/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

mongoose
    .connect(connectionSrt)
    .then(() => console.log("MongoDB connected", "hello"))
    .catch((error) => console.error("MongoDB error:", error));


export async function POST(req) {
    const payload = await req.json();
    let success = false;
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    const food = new foodSchema(payload);
    const result = await food.save();
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success });
}