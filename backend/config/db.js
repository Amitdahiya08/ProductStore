import mongoose from "mongoose";

export const ConnectDb = async ()=>{
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Db is connected");
    } catch (error) {
        console.log(`ERROR : ${error.message}`);
        process.exit(1);
    }

}
