import Order from "../modles/order.js";
import { isCustomer } from "./usercontroller.js";

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
        
        const neworderdata = req.body;
        neworderdata.orderID = orderID; // set the order id
        neworderdata.email = req.user.email; // set the email of the user

        const order = new Order(neworderdata); // create the order object
        await order.save(); // save the order to the database   

        res.json({message: "order created"}); 


    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

