import { connectionSrt } from "@/lib/db";
import { foodSchema } from "@/lib/foodsModel";
import { restaurantSchema } from "@/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = await params;
    console.log(id)
    let success = false;
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    let details = await restaurantSchema.findOne({ _id: id })
    const foodItems = await foodSchema.find({resto_id: id})
    if (details) {
        success = true
    }
    return NextResponse.json({ details, foodItems, success })
}