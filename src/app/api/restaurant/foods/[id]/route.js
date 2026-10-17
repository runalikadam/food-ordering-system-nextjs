import { connectionSrt } from "@/lib/db";
import { foodSchema } from "@/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

mongoose
    .connect(connectionSrt)
    .then(() => console.log("MongoDB connected", "hello"))
    .catch((error) => console.error("MongoDB error:", error));


export async function GET(req, { params }) {
    // const id = content.params.id;
    const { id } = await params;
    console.log(id)
    let success = false;
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    const result = await foodSchema.find({ resto_id: id });
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}

export async function DELETE(res, { params }) {
    const { id } = await params;

    let success = false;
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    const result = await foodSchema.deleteOne({ _id: id })
    if (result.deletedCount>0) {
        success = true
    }
    return NextResponse.json({ result, success })
}
