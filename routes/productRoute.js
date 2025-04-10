import express from 'express';
import { Createproduct , Getproduct  , Deleteproduct} from '../contollers/productcontoller.js';

const ProductRoute = express.Router();

ProductRoute.post('/' , Createproduct);
ProductRoute.get('/', Getproduct);
ProductRoute.delete('/:id',Deleteproduct);

export default ProductRoute;