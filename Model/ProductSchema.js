import mongoose from 'mongoose';

const productSchema =new mongoose.Schema({
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
    count:{
        type:Number,
        required:true
    }
})


export const ProductModule = mongoose.model('product',productSchema);
export default ProductModule;