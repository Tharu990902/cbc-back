import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    email: {
        type:String,
        required:true,
        unique:true
    },
    
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required:true
    }, 
    
    password:{

        type: String,
        required :true
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    type: {
        type: String,
        default: "customer"
    },

    profilePicture:{
        type: String,
        default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742793981~exp=1742797581~hmac=509ee8bd2f8e7c8f4a99b062c7251ea7062489e2287ea668489dc20b36b0ece5&w=826"
    }
})

const User = mongoose.model("users" , userSchema);

export default User;