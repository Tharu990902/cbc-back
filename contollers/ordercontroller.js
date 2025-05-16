import Order from "../modles/order.js";
import { isAdmin, isCustomer } from "./usercontroller.js";
import Product from "../modles/product.js";

export async function Createorder(req,res){
    
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
        console.log("New Order ID: " + orderID);
        const newOrderdata = req.body
        console.log(newOrderdata)

        const newproductArray = []
        

        for(let i=0;i<newOrderdata.order_items.length;i++){
            
            const productdetail = await Product.findOne({productId: newOrderdata.order_items[i].productId});

            if(productdetail == null){
                res.json({message: "ProductId = " + newOrderdata.order_items[i].productId +" not found"})
                return
            }
            
            newproductArray[i]= ({
                name: productdetail.productname,
                qty: newOrderdata.order_items[i].qty,
                price: productdetail.lastprice,
                image: productdetail.images[0],
            })
            
            await updateproductstock(newOrderdata.order_items); 
            console.log("Product stock updated for Product ID " + newOrderdata.order_items[i].productId);
        }
           newOrderdata.order_items = newproductArray; 
           newOrderdata.orderID = orderID; 
           newOrderdata.email = newOrderdata.email; 
           newOrderdata.Name = newOrderdata.shippingAddress?.name;
            newOrderdata.address = newOrderdata.shippingAddress?.address;
            newOrderdata.phone = newOrderdata.shippingAddress?.phone;
            newOrderdata.city = newOrderdata.shippingAddress?.city;
            newOrderdata.province = newOrderdata.shippingAddress?.province;

           const order = new Order(newOrderdata); 

           const savedorder =  await  order.save()
           
             res.json({message: "order created",
                            order: savedorder
           }).catch((error)=>{
                res.json({message: error.message});
                console.log(error.message);
           })


    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
};

export async function getQuote(req,res){

    try {
        
        const newOrderdata = req.body
        console.log(req.body)
        const newproductArray = []

        let Total =0;
        let labledTotal = 0;
        
        for(let i=0;i<newOrderdata.order_items.length;i++){
            
            const productdetail = await Product.findOne({productId: newOrderdata.order_items[i].productId});

            if(productdetail == null){
                res.json({message: "ProductId = " + newOrderdata.order_items[i].productId +" not found"})
                return
            }

            Total += productdetail.lastprice * newOrderdata.order_items[i].qty;
            labledTotal += productdetail.price * newOrderdata.order_items[i].qty;

            
            
            newproductArray[i]= ({
                name: productdetail.productname,
                qty: newOrderdata.order_items[i].qty,
                price: productdetail.lastprice,
                labledprice: productdetail.price,
                image: productdetail.images[0],
                
                
            })
  
        }
           
           newOrderdata.order_items = newproductArray;
           newOrderdata.Total = Total;
           newOrderdata.labledTotal = labledTotal;
           
           res.json({
            orderItems : newOrderdata.order_items,
            Total : Total,
            labeldTotal : labledTotal
           });

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export async function updateproductstock(order_items) {

    for (let i = 0; i < order_items.length; i++) {
            
        const newproduct = await Product.findOne({ productId: order_items[i].productId });
        const newstock = newproduct.stock - order_items[i].qty;
        newproduct.stock = newstock;

        try {
            await newproduct.save();
            // console.log(`Product stock updated for Product ID ${order_items[i].productId}.`);
        } catch (error) {
            console.log(`Error updating stock for Product ID ${order_items[i].productId}: ${error.message}`);
        }
    }
}

export async function getOrder(req,res){

    try {
        if(isCustomer(req)){
        const orders = await Order.find({email: req.user.email})
        res.json(orders);
        }
        else if(isAdmin(req)){
            const orders = await Order.find({})
            res.json(orders);
        }else{
            res.json({
                message: "please Login to view Orders"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function updateOrder(req,res){

   if(!isAdmin(req)){
        res.json({message :"You are not authorized to update a order"})
        return
    }
    const orderId = req.params.id;
    const updatedData = req.body;
    console.log(updatedData)
    try {
        const updatedOrder = await Order.updateOne({orderID: orderId}, updatedData);
        res.json({message: "Order updated successfully", order: updatedOrder});

    }   catch (error) {
        res.status(403).json({message: error.message});
    } 
  }

 


