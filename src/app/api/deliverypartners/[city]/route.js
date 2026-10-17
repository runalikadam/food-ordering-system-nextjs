import { connectionSrt } from "@/lib/db";
import { deliveryPartnerSchema } from "@/lib/deliveryPartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    let  {city}= await params;
    console.log(city)
    let success = false;
    await mongoose.connect(connectionSrt, {useNewUrlParser:true})
    let filter = {city:{$regex:new RegExp(city, 'i')}}
    const result = await deliveryPartnerSchema.find(filter)
    if(result){
        success= true
    }
    return NextResponse.json({result, success})
}