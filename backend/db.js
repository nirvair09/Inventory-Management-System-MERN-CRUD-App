const mongoose=require('mongoose');

const mongoURL="";

const  connectDB=async()=>{
    try {

        mongoose.set('strictQuery', false);

        mongoose.connect(mongoURL);
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.log(error);
    }
}