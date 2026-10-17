import { connectionSrt } from "@/lib/db";
import { restaurantSchema } from "@/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET() {
    let success = false
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    let result = await restaurantSchema.find()
    result = result.map((data)=>data?.city?.charAt(0).toUpperCase()+ data?.city?.slice(1))
    
    result = [...new Set(result.map((item) => item))]
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}