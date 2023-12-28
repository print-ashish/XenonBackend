const express = require("express");
const app = express();
const PORT = process.env.port || 8000;
const router = express.Router();
const path = require("path");
require("./models/user");
require("./models/contact");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const CONTACT = mongoose.model("CONTACT"); 
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL


const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));



require("./models/user");

// const cors = require("cors");
// require("./models/model")

app.use(express.json());
app.use(router);

mongoose.connect(
  MONGO_URL
);

mongoose.connection.on("connected", () => {
  console.log("databse connected");
});
mongoose.connection.on("error", () => {
  console.log("error connecting to database ");
});

// router.get("/showcustomers", (req, res) => {
//   CUSTOMERS.find().then((data) => {
//     res.json(data);
//   });
// });
// router.get("/showhistory", (req, res) => {
//   HISTORY.find().then((data) => {
//     res.json(data);
//   });
// });
// router.post("/signin", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//   USER.find({ email: req.body.email }).then((data) => {
//     res.json(data);
//   });
// });


router.post("/signup", (req, res) => {
//   console.log(req.body);
//   console.log(typeof req.body.response);
 

  //find existing user with the email
  USER.find({ email: req.body.useremail }).then((data) => {
    console.log("db data ",data)
    if(data.length > 0)
    {
        res.json({alreadyexist : "user already exist with the email"})
    }
    else
    {
        console.log("saving new user account");
        const user = new USER({
            username: req.body.username,
            email: req.body.useremail,
            password: req.body.password,
          });
        
          user
            .save()
            .then((data) => {
              console.log("account created");
              res.json({ usercreated: "saves success" });
            })
            .catch((err) => {
              error: "error saving data";
            });
    }


  });

 
});
router.post("/contact", (req, res) => {
  console.log(req.body);
  console.log(typeof req.body.response);
  console.log("saving new user contact");

        const user = new CONTACT({
            senderfirstname: req.body.firstName,
            senderlastname: req.body.lastName,
            senderemail: req.body.email,
            senderphone : req.body.mobileNumber,
            sendermsg : req.body.message
          });
        
          user
            .save()
            .then((data) => {
              console.log("account created");
              res.json({ success: "saves success" });
            })
            .catch((err) => {
              error: "error saving data";
            });
    });




// router.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });


router.post('/signin' , (req, res)=>
USER.find({ email: req.body.useremail }).then((data)=>
{
  const givenpassword = req.body.password;
  console.log(givenpassword)
  console.log(data[0].password)
  // console.log(JSON.parse(data));
  console.log("DATA = "+ data);
   if(data.length > 0)
   {
      if(data[0].password == givenpassword)
      {
        res.json({success : "login success"});
      }
      else{
        res.json({failure : "login success"});

      }
       
   }
   else{
    res.json({nouser : "no user with this email"});


   }
})
)
app.listen(PORT, () => {
  console.log(`server started at + ${PORT}`);
});
