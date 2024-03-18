import mongoose from 'mongoose';

const cartSchema =new mongoose.Schema({
    title:{
        type : String,
        required:true
    },
    description:{
        type : String,
        required:true
    },
    category:{
        type : String,
        required:true
    },
    image:{
        type : String,
        required:true
    },
    price:{
        type : Number,
        required:true
    },
    rating:{
        type : Number,
        required:true
    },
    numberofproduct:{
        type:Number,
        required:true
    },
    userid:{
       type:String,
       required:true
    }
})


export const CartModule = mongoose.model('carts',cartSchema);
export default CartModule;