import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({

    orderID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        requied: true,
    },
    order_items: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
        }
    ],
    date: {
        type: Date,
        default: Date.now,
    },
    paymentid: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    note: {
        type: String,
    },
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phoneNo:{
        type: String,
        required: true,
    },
        
})

const Order  = mongoose.model("Orders" , OrderSchema);

export default Order;