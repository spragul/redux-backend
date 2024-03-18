import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { mongoconnect } from './Database/database.js';
import productrouter from './Router/productRouter.js';
import userrouter from './Router/userRouter.js';
import cartrouter from './Router/cartRouter.js';
import paymentrouter from "./Router/PaymentRouter.js"

dotenv.config();
const port=process.env.PORT;
const app =express();
app.use(cors({origin:`${process.env.frontendurl}`}));
app.use(express.json());

mongoconnect()

app.use('/product',productrouter);
app.use('/user',userrouter);
app.use('/cart',cartrouter);
app.use('/payment',paymentrouter);
app.use('/',(req,res)=>{
res.status(200).json({message:"<h1>Redux Working<h1>"})
})

app.listen(port,()=>{ console.log(`App listen port :${port}`)})