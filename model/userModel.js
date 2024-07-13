
const moongose=require('mongoose')

const userSchema=moongose.Schema({
    username:{
        type:String,
        required:[true,"enter your username"]
    },

    email:{
        type:String,
        required:[true,"enter your email-Address"],
        unique:[true,"Already registered User"]
    },

    password:{
        type:String,
        required:[true,"enter your password"],
        
    }
},{
    timestamps:true
});

module.exports=moongose.model("User",userSchema)