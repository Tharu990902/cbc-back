import Product from "../modles/product.js";

export function Createproduct(req,res){

     console.log(req.user);
     if(req.user == null){
         res.json({message: "Unauthorized user"});
         return;
     }

    //  if(req.user.type != "admin"){
    //         res.json({message: "cant create product"});
    //         return;
    //  }
     else{
    const newproduct = new Product(req.body);
    newproduct.save().then(()=>{
        res.json({message: "New product created"});
    }).catch((err)=>{
        res.json({message: err.message});
    })
}
};

export function Getproduct(req,res){
    
    Product.find().then((productlist)=>{
        res.json(productlist);
    }).catch((err)=>{
        res.json({message: err.message});
    })
};

export function Deleteproduct(req,res){

    const name = req.params.name
    Product.deleteOne({name: name}).then(()=>{res.json({message: "Product deleted"});}).
    catch((err)=>{res.json({message: err.message});})
}

export function getproductdetail(req,res){

    const name = req.params.name;
    
    Product.find({name: name}).then((productlist)=>{
        if(productlist.length == 0){
            res.json({message: "Product not found"});
        }else{
        res.json(productlist);}
    }).catch((err)=>{
        res.json({message: err.message});
    })
}


