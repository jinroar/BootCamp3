import mongoose from "mongoose";
import "dotenv/config"

export const ConnectDB = async () => {
    try { 
        const DB_URI: string | undefined = process.env.MONGO_URI

        if (!DB_URI) {
            throw new Error("Error")
        }

        await mongoose.connect(DB_URI).then(() => {
            console.log("Connected to DB")
        })
    } catch (error) {
        console.log(error)
    }
}