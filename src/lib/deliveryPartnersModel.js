// import  mongoose from "mongoose";

import mongoose from "mongoose"

const deliveryPartnersModel = new mongoose.Schema({
    name: String,
    mobile: String,
    password: String,
    city: String,
    address: String,


});

export const deliveryPartnerSchema = mongoose.models.deliverypartners || mongoose.model("deliverypartners", deliveryPartnersModel)
