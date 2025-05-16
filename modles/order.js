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
            qty: {
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
        default: () => new Date(),
        
    },
    paymentid: {
        type: String,
        
    },
    status: {
        type: String,
        default: "pending",
    },
    note: {
        type: String,
    },
    Name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    province:{
        type: String,
        required: true,
    }
        
})



const Order  = mongoose.model("Orders" , OrderSchema);

export default Order;