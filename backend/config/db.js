import mongoose from "mongoose"

const ConnectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ecommerce"
        })
        console.log("MongoDB connected successfully...");
        
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }

}

export default ConnectDB;