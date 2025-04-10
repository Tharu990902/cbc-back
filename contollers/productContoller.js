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
            res.status(403).json({message: "error"})
            console.log(error)
        }
    
        
        
}

export function Getproduct(req,res){

        Product.find({}).then((productlist)=>{
            res.json(productlist);
        }).catch((error)=>{
            res.json({message: error})
        })
}

export function Deleteproduct(req,res){

    if(!isAdmin(req)){
        res.json({message :"You are not authorized to delete a product"})
        return
    }

    const productId = req.params.id;
    Product.deleteOne({productId: productId}).then(()=>{
        res.json({message: "product deleted"})
    }).catch((error)=>{
        res.json({message: error})
    })
}
