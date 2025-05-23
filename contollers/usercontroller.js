import User from "../modles/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function Createuser(req,res){

    const newuserdata = req.body;

    if(newuserdata.type == "admin"){
        
        if(req.user == null ){
            res.json({message: "You are not authorized to create an admin user"});
            return
        }
        if( req.user.type != "admin"){
            res.json({message: "You are not authorized to create an admin user"});
            return
        }
    }
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
            

            res.json({message: "login success", token: token ,
                user:{
                    firstname: user.firstname,
                    lastname: user.lastname,
                    type: user.type,
                    profilePicture: user.profilePicture,

                }
            });
        }
        else{
            res.json({message: "invalid password"});
    }
    }}
    
).catch((err)=>{
    res.json({message: err.message});
    console.log(err.message);})
}


export function isAdmin(req){

    if(req.user == null){
        return false;
    }
    if(req.user.type != "admin"){
        return false;
    }

    return true;
}
export function isCustomer(req){

    if(req.user == null){
        return false;
    }
    if(req.user.type != "customer"){
        return false;
    }

    return true;
}

export async function GoogleLogin(req, res) {
    let token = req.body.token;

    try {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        const email = data.email;
        console.log(data);

        // Check if user already exists
        let user = await User.findOne({ email: email });

        if (user) {
            // User exists, generate token
            const token = jwt.sign({
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                isBlocked: user.isBlocked,
                type: user.type,
                profilePicture: user.profilePicture
            }, process.env.SECTER_KEY);

            return res.json({ message: "Login success", token: token, user:{
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                type: user.type,
                profilePicture: user.profilePicture,

            } });
        }

        // User does not exist, create new user
        const newUser = new User({
            email: email,
            firstname: data.given_name,
            lastname: data.family_name,
            profilePicture: data.picture,
            type: "customer",
            password: bcrypt.hashSync(process.env.password, 10) // Hash default password
        });

        await newUser.save();

        const tokenNewUser = jwt.sign({
            email: newUser.email,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            isBlocked: newUser.isBlocked,
            type: newUser.type,
            profilePicture: newUser.profilePicture
        }, process.env.SECTER_KEY);

        return res.json({ message: "login success", token: tokenNewUser, user:{
                    email: newUser.email,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    type: newUser.type,
                    profilePicture: newUser.profilePicture,

                } });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in Google login" });
    }
}

export async function Getuser(req,res){
   
    if(req.user == null){
        return
    }else {
         res.json(req.user)
    }
   
}





// "Tharu@123gmail.com",
//hashedpassword123

//johnkamal@gmail.com
// https://www.googleapis.com/oauth2/v3/userinfo