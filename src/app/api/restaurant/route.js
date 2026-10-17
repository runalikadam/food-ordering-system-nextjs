
import { connectionSrt } from "@/lib/db";
import { restaurantSchema } from "@/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// mongoose
//     .connect(connectionSrt)
//     .then(() => console.log("MongoDB connected", "hello"))
//     .catch((error) => console.error("MongoDB error:", error));


export async function GET() {
  try {
    await mongoose.connect(connectionSrt);

    const data = await restaurantSchema.find();

    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("Restaurant API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
    await mongoose.connect(connectionSrt/* , { useNewUrlParser: true } */)
    let payload = await req.json();
    let result;
    let success = false;
    if (payload.login) {
        result = await restaurantSchema.findOne({ emailId: payload.emailId, password: payload.password})
        if (result) {
            success = true
        }
    } else {
        let restaurant = new restaurantSchema(payload)
        result = await restaurant.save();
        if (result) {
            success = true
        }
    }

    return NextResponse.json({ result: result, success })
}



// export async function POST(req) {
//     try {
//         await mongoose.connect(connectionSrt);

//         const payload = await req.json();
//         let result;

//         if (payload.login) {
//             result = await restaurantSchema.findOne({
//                 emailId: payload.emailId,
//                 password: payload.password
//             });

//             if (!result) {
//                 return NextResponse.json({
//                     success: false,
//                     message: "Invalid email or password"
//                 }, { status: 401 });
//             }
//         } else {
//             const restaurant = new restaurantSchema(payload);
//             result = await restaurant.save();
//         }

//         return NextResponse.json({
//             success: true,
//             result
//         });

//     } catch (error) {
//         console.error("Restaurant API error:", error);

//         return NextResponse.json({
//             success: false,
//             message: "Something went wrong"
//         }, { status: 500 });
//     }
// }

