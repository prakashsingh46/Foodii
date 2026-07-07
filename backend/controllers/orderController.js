import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Placing order from frotend

const placeOrder = async(req, res)=>{
    // console.log("payment api is called");
        const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173"
    let payment=false;
    try {
        //creating new order
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        // saving the order
        await newOrder.save();
        

        // creating stripe payment link(neccessary fo stripe payment)
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*85
            },
            quantity:item.quantity
        }));

        //pushing delivery charge
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*85 //delivery charge $2
            },
            quantity:1
        })

        //creating session
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        //sending session url in respone on success
        res.json({success:true, session_url:session.url})
        payment=true
        // console.log("payment api is called");

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in payment"} )
    }

    if(payment){
        //removing from cart after order
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
    }
    
}

const verifyOrder = async (req, res)=>{
    const {orderId, success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {placeOrder, verifyOrder};
