import express from 'express';
import { Createproduct , Getproduct  , Deleteproduct , Updateproduct,Getproductbyid , SearchProduct} from '../contollers/productcontoller.js';

const ProductRoute = express.Router();


ProductRoute.post('/' , Createproduct);
ProductRoute.get('/', Getproduct);
ProductRoute.get('/search/:query', SearchProduct);
ProductRoute.delete('/:id',Deleteproduct);
ProductRoute.put('/:id',Updateproduct);
ProductRoute.get('/:id',Getproductbyid);


export default ProductRoute;