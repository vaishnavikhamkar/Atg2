import express from "express";
import User from "../Model/userSchema.js";
import bcrypt from "bcrypt";
import randomstring from "randomstring";

const router=express.Router();

router.post("/register",async (req,res)=>{
    try{
        //generate new Password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });

        //save user
        const user= await newUser.save();
         res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }

    
});


//LOGIN:
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found.");

        const validPassword=await bcrypt.compare(req.body.password,user.password)
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)

    }catch(err){
        console.log(err);
    }
    
});


// forgot Password
router.post("/forgotPassword", async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        
        if(user){
            const randomString=randomstring.generate();
            const data=await User.updateOne({email:req.body.email},{$set:{token:randomString}});
             res.status(200).send({success:true,msg:"Password reset mail will be sent to this mail."})
        }
        else{
            res.status(200).send({success:true,msg:"This email does not exists."})
        }

    }catch(err){
        console.log(err);
    }
    
})



export default router;