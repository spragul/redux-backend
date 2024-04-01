import Razorpay from "razorpay"
import dotenv from "dotenv";
import mongoose from 'mongoose';
import OrderModel from "../Model/paymentSchema.js";
dotenv.config();

export const key=async (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
};

export const createmyorder= async (req, res) => {
  try {
    if(parseInt(req.body.amount)>0){
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
      console.log(req.body)
      const options = {
        amount: req.body.amount,
        currency: 'INR',
      };
      const order = await instance.orders.create(options);
      if (!order) return res.status(500).send('Some error occured');
      res.send(order);
    }else{
      res.status(400).json({message:"amount not selected",rd:true})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const payOrder= async (req, res) => {
  try {
    const { product, userId, amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = OrderModel({
      product: product,
      userId: userId,
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      rd: true,
      msg: 'Payment was successfull',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//get all orders
export const Allorder= async (req, res) => {
 try {
  const orders = await OrderModel.find();
  if(orders.length>0){
  res.status(200).json({message:"All Orders ",orders,rd:true});
  }else{
    res.status(202).json({message:"Emtpt Orders List",rd:false})
  }
 } catch (error) {
  res.status(500).json({message:"Internal server error",rd:false})
  console.log(error)
 }
};

//get user orders
export const oneOrder= async (req, res) => {
try {
  const orders = await OrderModel.find({ userId: req.params.userid});
  if(orders.length>0){
    res.status(200).json({message:"Orders List",orders,rd:true})
  }else{
    res.status(202).json({message:"Emtpt Orders List",rd:false})
  }
} catch (error) {
  res.status(500).json({message:"Internal server error",rd:false});
  console.log(error)
}
};

//delete
export const deleteOrder= async (req, res) => {
  try {
    const orders = await OrderModel.findOne({_id:res.params.id} );
    if(orders){

      res.status(200).json({message:"Order successfully Deleted",rd:true})
    }else{
      res.status(400).json({message:"Order Not Deleted",rd:false})
    }
  } catch (error) {
    res.status(500).json({message:"Internal server error",rd:false});
    console.log(error)
  }
  };