const moongose=require('mongoose');


const contactSchema=moongose.Schema({
    user_id:{
        type:moongose.Schema.Types.ObjectId,
        required:[true],
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"Please add the contact name"],
    },

    email:{
        type:String,
        required:[true,"Please add the contact email addresss"],
    },

    phone:{
        type:Number,
        required:[true,"Please add the contact phone number"],
    }
},{
    timestamps:true
})

module.exports=moongose.model("Contact",contactSchema);