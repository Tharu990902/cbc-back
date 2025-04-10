import Product from "../modles/product.js";
import { isAdmin , isCustomer } from "./usercontroller.js";


export  async  function  Createproduct(req,res){

        if(!isAdmin(req)){
            res.json({message :"You are not authorized to create a product"})
            return
        }
        const productdata = req.body;
        const product  = new Product(productdata);

        try {
            await product.save()
            res.json({message: "product created"})
            console.log(productdata)
        }
        catch (error) {
            res.json({message: "error"})
            console.log(error)
        }
       
    //    await  product.save().then(()=>{
    //         res.json({message: "product created"})
    //     }).catch((error)=>{
    //         res.json({message: "error"})
    //     }) 
        
        
}

export function Getproduct(req,res){

        Product.find({}).then((productlist)=>{
            res.json(productlist);
        }).catch((error)=>{
            res.json({message: error})
        })
}
