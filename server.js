import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import StudentRoute from './routes/studentroute.js';
import ProductRoute from './routes/productRoute.js';
import UserRoute from './routes/userRoute.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT =  5000;

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

app.use('/api/student', StudentRoute);
app.use('/api/product', ProductRoute);
app.use('/api/user', UserRoute);

app.get('/', (req, res) => {

    console.log(req.body);

    const date = new Date();

    if(date.getHours() >= 0 && date.getHours() < 12){
        res.json({message: "Hii " +req.body.name+'  Good Morning'});

    }else if(date.getHours() >= 12 && date.getHours() < 17){
        res.json({message: "Hii " +req.body.name+ ' Good Afternoon'});     
    }
    else{
        res.json({message:  "Hii " +req.body.name+' Good Evening'});
    }
}
);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

