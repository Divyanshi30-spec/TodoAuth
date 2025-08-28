import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

//signup
export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    
      const hashedPassword = await bcrypt.hash(password, 10); //hashed password
    
      //save new user in DB
      const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
      res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: newUser._id,                      // it identifies that the exact user was created and password is not secure that why we prefer id to findout user
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//login user
export const login=async(req,res)=>{
    try{
        const {email, password}=req.body

        const user= await User.findOne({email})    //user check
        if(!user) return res.status(400).json({msg: "Invalid credentials"});
 
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
         
        //create token
        const token= jwt.sign(
            {
            id: user._id, email: user.email
        }, process.env.JWT_SECRET,
    {expiresIn: "1h"}
);
    res.json({token});
    }catch(err){
        res.status(500).json({msg: err.message});
    }
};




