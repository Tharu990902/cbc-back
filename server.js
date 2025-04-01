import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRoute from './routes/userRoute.js';
import ProductRoute from './routes/productRoute.js';
import OrderRoute from './routes/orderRoute.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const app = express();


const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl, {})
const connection = mongoose.connection;
connection.once("open", () => {
    console.log('MongoDB database connection established successfully');
});

app.use(bodyParser.json());

app.use((req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token != null) {
    jwt.verify(token, process.env.SECTER_KEY, (err,decoded) => {
        if (!err) {
            req.user = decoded
        }
    });
    
    }
    next();
});


app.use('/api/user', UserRoute);
app.use('/api/product' , ProductRoute);
app.use('/api/order' , OrderRoute);


app.listen(5000, () => {
    console.log(`Server is running on PORT 5000`);
});

