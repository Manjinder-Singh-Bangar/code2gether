import mongoose from "mongoose";

const DB_NAME = "code2gether"

const dbConnect = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        console.log("MongoDb connected !! Mongodb host:"+ connectionInstance.connection.host)
    } catch (error) {
        console.error("Error occured while connecting to the database"+error)
        process.exit(1)
    }
}


export default dbConnect;