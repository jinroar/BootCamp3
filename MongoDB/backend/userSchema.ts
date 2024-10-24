import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

        name: String,
        email: String,
        password: String,
        role: [String]
})

const User = mongoose.model("User", userSchema, "users");

export {    userSchema,User }