import  {Createorder, getQuote , getOrder} from '../contollers/ordercontroller.js';
import express from 'express';

const OrderRoute = express.Router();

OrderRoute.post('/' , Createorder);
OrderRoute.post('/quote' , getQuote);
OrderRoute.get('/' , getOrder)

export default OrderRoute;