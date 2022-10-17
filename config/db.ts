const mongoose = require("mongoose")
const config = require("config")
const db = config.get("mongoDB_URI")

const connectDB = async () => {
    try{
        await mongoose.connect(db);
        console.log("MongoDB connected successfully");
    } catch (error:any){
        console.log(error.message);
        //exit process with a failure 
        process.exit(1);
    }
};

module.exports = connectDB;