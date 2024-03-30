import { rolebasedAuthentication, validate } from "../Authentication/auth.js";
import {
  Allorder,
  createmyorder,
  deleteOrder,
  key,
  oneOrder,
  payOrder,
} from "../Controller/paymentcontroller.js";
import express from "express";
const router = express.Router();

router.get("/get-razorpay-key", key);
router.post("/create-order", validate, createmyorder);
router.post("/pay-order", validate, payOrder);
router.get("/list-orders", rolebasedAuthentication, Allorder);
router.get("/list-orders/:userid", validate,oneOrder);
router.delete("/order/delete:id", rolebasedAuthentication, deleteOrder);
export default router;
