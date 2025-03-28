import express from 'express';
import { Createproduct , Getproduct } from '../contollers/productcontoller.js';

const ProductRoute = express.Router();

ProductRoute.post('/' , Createproduct);
ProductRoute.get('/',Getproduct);

export default ProductRoute;