import { connectionSrt } from "@/lib/db";
import { restaurantSchema } from "@/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
    let success = false
    await mongoose.connect(connectionSrt, { useNewUrlParser: true })
    let queryParams = req.nextUrl.searchParams
    console.log(queryParams.get('location'))
    let filter = {}
    if (queryParams.get('location')) {
        let city = queryParams.get('location');
        filter = { city: { $regex: new RegExp(city, 'i') } }
    }
    else if (queryParams.get('restaurant')) {
        let name = queryParams.get('restaurant');
        filter = { rName: { $regex: new RegExp(name, 'i') } }
    }
    let result = await restaurantSchema.find(filter)
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}