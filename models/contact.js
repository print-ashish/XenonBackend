const mongoose = require("mongoose");

const contact = new mongoose.Schema(
    {
         senderfirstname :
         {
            type: String,
            required: true
         } ,
         senderlastname :
         {
            type: String,
            required: true
         } ,
    
         senderemail:
         {
            type:String,
            required: true
         },
         senderphone: 
        {
         type: String,
         required : true
        }
         ,
         sendermsg: 
        {
         type: String,
         required : true
        }

         

    }

)

mongoose.model("CONTACT", contact)