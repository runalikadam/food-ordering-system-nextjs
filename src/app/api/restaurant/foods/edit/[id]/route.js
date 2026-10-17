import { connectionSrt } from "@/lib/db";
import { foodSchema } from "@/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    const { id } = await params;
    let success = false;
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    const result = await foodSchema.findOne({ _id: id })
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const payload = await req.json()
    let success = false;
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    const result = await foodSchema.findOneAndUpdate({ _id: id }, payload)
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}