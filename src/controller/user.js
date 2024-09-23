import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";
import UserModel from "../model/user.js";
import jwt from "jsonwebtoken";


const GET_ALL_USERS= async(req, res)=>{
    try{
        const users=await UserModel.find().sort({"name": 1 }).select(`name photo`);
        res.status(200).json({users: users});
    } catch(err){
      console.log(err);
      return res.status(500).json({mesage:`Server error`});
    }
};
const SIGN_UP= async (req, res)=> {
    try{
        if(!req.body.name || !req.body.email || !req.body.password ){
            return res.status(400).json({message: "You didn't provided necessary data"});
        }
        const password = req.body.password;
        if (!/^(?=.*\d).{6,}$/.test(password)) {
            return res.status(400).json({ message: "The password must be at least 6 characters long and contain at least one number" });
        }
      const salt=bcrypt.genSaltSync(10);  
      const hash=bcrypt.hashSync(req.body.password, salt); 

      const user= { 
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        id: uuidv4(),
        password: hash,
     };
     const newUser= new UserModel(user);
     try {
        await newUser.save();
    } catch (validationError) {
        return res.status(400).json({ message: 'User validation failed', errors: validationError.errors });
    }
     const jwtToken=jwt.sign(
        {
            email: newUser.email,
            userId: newUser.id,
        }, process.env.JWT_SECRET,
        {expiresIn: "24H"}
     );
    
     return res.status(201).json({
        user: newUser,
        jwtToken: jwtToken,
        userId: newUser.id,
        message: `Registration successful`});
    } catch(err){
        console.log(err);
        return res.status(500).json({message: `Server error`});
    }
};
const LOGIN= async (req, res)=> {
    const user= await UserModel.findOne({email: req.body.email});
    if(!user){
        return res.status(403).json({message: "Bad authorization"})
    }
    const isPasswordMatch=bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordMatch){
        return res.status(403).json({message: "Bad authorization"});
    }
    const jwtToken=jwt.sign(
        {
            email: user.email,
            userId: user.id,
        }, process.env.JWT_SECRET,
        {expiresIn: "24H"}
    );
   
    return res.status(200).json({jwtToken: jwtToken, userId: user.id, message: "Login was successfull"});

};
const VALIDATE_LOGIN= async (req, res)=>{
    try{
        return res.status(200).json({massage: "user ok"});
    } catch (err){
        console.log (err);
        return res.status(500).json({message: "error in application"});
    }
};


export { GET_ALL_USERS, SIGN_UP, LOGIN, VALIDATE_LOGIN};