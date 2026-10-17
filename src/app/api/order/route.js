import { connectionSrt } from "@/lib/db"
import { orderSchema } from "@/lib/ordersModel"
import { restaurantSchema } from "@/lib/restaurantsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"


export async function POST(req) {
    const payload = await req.json()
    await mongoose.connect(connectionSrt)
    let success = false
    const orderObj = new orderSchema(payload)
    const result = await orderObj.save()
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}


export async function GET(req) {
    const userId = req.nextUrl.searchParams.get('id');
    await mongoose.connect(connectionSrt)
    let success = false
    // const orderObj = new orderSchema(payload)
    let result = await orderSchema.find({ user_Id: userId });
    if (result) {
        // let restoData = result.map(async (item) => {
        //     let restoInfo = {};
        //     restoInfo.data = await restaurantSchema.find({ _id: item.resto_id })
        // })
        let restoData = await Promise.all(
            result.map(async (item) => {
                let restoInfo = {};
                restoInfo.data = await restaurantSchema.find({ _id: item.resto_id })
                restoInfo.amount = item.amount;
                restoInfo.status = item.status;
                return restoInfo;
        })
        )
        result = restoData;
        success = true
    }
    return NextResponse.json({ result, success })
}