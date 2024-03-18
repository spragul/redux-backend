import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url =process.env.MONGO_URL;

export const mongoconnect = async () => {
    let res =await mongoose.connect(url);
    if(res){
        console.log('DataBase connect')
    }else{
        console.log('DataBase not Connect')
    }
   
};
