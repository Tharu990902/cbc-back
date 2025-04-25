import  {Createorder, getQuote} from '../contollers/ordercontroller.js';
import express from 'express';

const OrderRoute = express.Router();

OrderRoute.post('/' , Createorder);
OrderRoute.post('/:quote' , getQuote);

export default OrderRoute;