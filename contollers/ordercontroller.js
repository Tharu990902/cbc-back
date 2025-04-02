import Order from "../modles/order.js";
import { isCustomer } from "./usercontroller.js";
import Product from "../modles/product.js";

export async function Createorder(req,res){
    
    // cbc0001
    // check previous oeder id
    if(!isCustomer){
        res.json({message :"You are not authorized to create a order"});
        return
    };

    try {

        const lastorderId = await Order.find().sort({date: -1}).limit(1);

        let orderID;

        if(lastorderId.length == 0){
            orderID = "CBC0001"
        }
        else{
            const currentId = lastorderId[0].orderID;
            const currentIdNumber = parseInt(currentId.replace("CBC" , "")) ; // get the number part of the order id
            const newIdNumber = currentIdNumber + 1; // increment the number part by 1
             orderID = "CBC" + newIdNumber.toString().padStart(4, '0'); // create the new order id
             
            
        }

        const newOrderdata = req.body

        const newproductArray = []

        for(let i=0;i<newOrderdata.order_items.length;i++){
            
            const productdetail = await Product.findOne({productId: newOrderdata.order_items[i].productId});

            if(productdetail == null){
                res.json({message: "ProductId = " + newOrderdata.order_items[i].productId +" not found"})
                return
            }
            
            newproductArray[i]= ({
                name: productdetail.productname,
                quantity: newOrderdata.order_items[i].quantity,
                price: productdetail.price,
                image: productdetail.images[0],
            })
           
           
        }
           newOrderdata.order_items = newproductArray; 
           newOrderdata.orderID = orderID; 
           newOrderdata.email = req.user.email; 

           const order = new Order(newOrderdata); 
            await  order.save().then(()=>{
                res.json({message: "order created"});
           }).catch((error)=>{
                res.json({message: error.message});
                console.log(error.message);
           })
       


    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
};

