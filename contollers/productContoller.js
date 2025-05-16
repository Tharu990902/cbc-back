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

export async function Updateproduct(req,res){
    if(!isAdmin(req)){
        res.json({message :"You are not authorized to update a product"})
        return
    }

    const productId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedProduct = await Product.updateOne({productId: productId}, updatedData);
        res.json({message: "Product updated successfully", product: updatedProduct});
    } catch (error) {
        res.status(403).json({message: error.message});
    }
}
export async function Getproductbyid(req, res) {

    const productId = req.params.id;
    console.log("Fetching product with ID:", productId);

    try {
        const product = await Product.findOne({ productId: productId }); // or findById(productId)
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
}
 
export async function Getproductbybycategor(req,res){

    const category = req.param.category;
    console.log("fetching product with category:", category);
    try{
        const product = await product.find({category: category});
        res.json(product);
    } 
    catch(error){
        console.log("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function SearchProduct(req, res) {
    const query = req.params.query;

    // Validate query
    if (typeof query !== "string" || !query.trim()) {
        return res.status(400).json({ error: "Invalid search query" });
    }

    try {
        // Search in productname and alternames (if alternames is an array)
        const product = await Product.find({
            $or: [
                { productname: { $regex: query, $options: 'i' } },
               {alternames: { $regex: query, $options: 'i' }}  ,
               {description: { $regex: query, $options: 'i' }}
            ]
        });

        res.json(product);
    } catch (error) {
        console.log("Error searching for product:", error);
        res.status(500).json({ message: "Server error" });
    }
}





