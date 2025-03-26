import User from "../modles/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export function Createuser(req,res){

    const newuserdata = req.body;
    newuserdata.password = bcrypt.hashSync(newuserdata.password, 10); // hash password
    const newuser = new User(newuserdata);
    newuser.save().then(()=>{
        res.json({message: "New user created"});
        console.log(newuserdata);
    }).catch((err)=>{
        res.json({message: err.message});
        console.log(err.message);
    })
}

export function LoginUser(req,res){

    

    User.find({email : req.body.email}).then((User)=>{
        if(User.length == 0){
            res.json({message: "User not found"});
    }
    else{

        const user = User[0];
       const  iscorrectpassword = bcrypt.compareSync(req.body.password , user.password); // compare password

        if(iscorrectpassword){
            const token = jwt.sign({
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                isBlocked: user.isBlocked,
                type: user.type,
                profilePicture: user.profilePicture
            } , process.env.SECTER_KEY);
            

            res.json({message: "login success", token: token});
        }
        else{
            res.json({message: "invalid password"});
    }
    }}
).catch((err)=>{
    res.json({message: err.message});
    console.log(err.message);})
}