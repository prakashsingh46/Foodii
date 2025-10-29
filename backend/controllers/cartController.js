import userModel from "../models/userModel.js"

//Add items to users cart
const addToCart = async(req, res)=>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Added To Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in adding to cart"})
    }
}


//remove items from users cart
const removeFromCart = async(req, res)=>{
    try {
        // console.log(req.body);
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
            if(cartData[req.body.itemId]===0){
                delete cartData[req.body.itemId];
            }
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message:"removed from carrt"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Error in removing cart data"});
    }
}


//fetch user cart data
const getCart = async (req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in fetching cart data"});
    }
}

export {addToCart, removeFromCart, getCart};