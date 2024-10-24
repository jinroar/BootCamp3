import express from 'express';
import mongoose from 'mongoose';
import { User } from './userSchema';
import { json } from 'stream/consumers';

const apps = express();
apps.listen(9999,()=>{

})


apps.use(json())

apps.get("/", (req, res)=>{
console.log("HSHHSHHS")

res.status(200).json({
    message:"nvalid"
})

mongoose.connect('mongodb+srv://jinroar:9y9sdEgcGQhseeae@cluster.szubi.mongodb.net/storage')


})

apps.get("/getUser",(req,res)=>{

    const id = req.query.userId;

    if(id){
        const user = User.findById(id).exec();
        res.status(200).json({
            ...user,
            password: undefined
        })


    }else{
        res.status(500).json({
            message:"nvalid"
        })
    }

})


apps.post("/login", async (req,res)=>{

    const username = req.body.username;
    const pass = req.body.pass;




    if(username){
       const userQuery = await User.where({email:username});
        const user = await userQuery.findOne();
        if(user){
            res.status(200).json({
                message:"ald"
            })
        }else{
            res.status(500).json({
                 message:"nvalid"
            })
        }

    }

})

