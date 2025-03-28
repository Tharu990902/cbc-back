import Product from "../modles/product.js";
import { isAdmin , isCustomer } from "./usercontroller.js";

export function  Createproduct(req,res){

        const newproduct  = new Product(req.body);

        
}