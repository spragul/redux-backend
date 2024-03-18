import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  product: { type: Object, required: true },
  userId: { type: String, required: true },
  isPaid: Boolean,
  amount: Number,
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
});
export let OrderModel = mongoose.model('order', OrderSchema)
 export default OrderModel