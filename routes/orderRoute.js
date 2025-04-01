import  {Createorder} from '../contollers/ordercontroller.js';
import express from 'express';

const OrderRoute = express.Router();

OrderRoute.post('/' , Createorder);

export default OrderRoute;