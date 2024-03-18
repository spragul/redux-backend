import { rolebasedAuthentication } from "../Authentication/auth.js";
import { Allorder, createmyorder, deleteOrder, key, oneOrder, payOrder } from "../Controller/paymentcontroller.js";
import express from "express"
const router =express.Router()

router.get('/get-razorpay-key',key);
router.post('/create-order',createmyorder);
router.post('/pay-order',payOrder);
router.get('/list-orders',rolebasedAuthentication,Allorder);
router.get('/list-orders/:userid', oneOrder);
router.delete('/order/delete:id',rolebasedAuthentication,deleteOrder);
export default router