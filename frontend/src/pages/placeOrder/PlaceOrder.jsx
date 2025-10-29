import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import "./PlaceOrder.css"
import axios from "axios"

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url, isLoading, setIsLoading} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  });

  const onChangeHandler = (event)=>{
    const name=event.target.name;
    const value=event.target.value;

    setData(prev=>({...prev,[name]:value}));
  }

  const placeOrder = async (event)=>{
    // console.log("hiii")
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo =item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    setIsLoading(true);
    try {
      // console.log(url);
      let response =await axios.post(url+"/api/order/place", orderData,{headers:{token}});
      if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
      }
      else{
        alert("Error in payment!!")
      }
      
    } catch (error) {
      console.log("payment failed")
    }finally{
      // setIsLoading(false);
    }
  }


  return (
    <form onSubmit={placeOrder} className={isLoading?"place-order loading":"place-order"}  >
      <div className="place-order-left">
        <p className="title"> Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName}  type="text" placeholder='first-name' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='last-name' />
        </div>
        <input required type="text" name="email" onChange={onChangeHandler} value={data.email} placeholder='Email address' />
        <input required type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className="multi-fields">
          <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='city' />
          <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder='zip-code' />
          <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='phone' />
      </div>
      <div className="place-order-right">
          <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0: getTotalCartAmount()+2}</p>
            </div>
            <button type="submit" >PROCEED TO PAYMENT</button>
          </div>
        </div> 
      </div>
      {isLoading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
          <p>Processing Payment...</p>
        </div>
      )}

    </form>
  )
}

export default PlaceOrder
