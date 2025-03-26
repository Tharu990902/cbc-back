import express from 'express';
import { Createproduct, Getproduct , Deleteproduct , getproductdetail} from '../contollers/productContoller.js';

const ProductRoute  = express.Router();


ProductRoute.get('/',Getproduct);
ProductRoute.get('/filter', (req,res)=>{
    res.json({message: 'Filter product'});
});
ProductRoute.post('/',Createproduct);
ProductRoute.delete('/:name',Deleteproduct);
ProductRoute.get('/:name', getproductdetail);

export default ProductRoute;