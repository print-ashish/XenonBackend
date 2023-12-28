const mongoose = require("mongoose");
// const {ObjectId} = mongoose.Schema.Types;

const user = new mongoose.Schema(
    {
         username :
         {
            type: String,
            required: true
         } ,
    
         email:
         {
            type:String,
            required: true
         },
         password: 
        {
         type: String,
         required : true
        }
         
    }

)

mongoose.model("USER", user)