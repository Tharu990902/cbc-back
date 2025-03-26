import mongoose from "mongoose";

const mongooseSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const Product = mongoose.model('products', mongooseSchema);

export default Product;