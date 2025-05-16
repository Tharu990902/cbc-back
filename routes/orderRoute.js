import  {Createorder, getQuote , getOrder , updateOrder } from '../contollers/ordercontroller.js';
import express from 'express';

const OrderRoute = express.Router();

OrderRoute.post('/' , Createorder);
OrderRoute.post('/quote' , getQuote);
OrderRoute.get('/' , getOrder)
OrderRoute.put('/:id' , updateOrder);


export default OrderRoute;