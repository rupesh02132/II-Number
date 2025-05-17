const express=require('express');
const app=express();
const mongoose = require('mongoose');
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 

main()
.then(() => console.log('Connected to DB'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/DemoforToken');

}



// const user=new User({
//     name:"rupesh"
//     ,email:"jVYk5@example.com",
//     password:"1234"
// })
// user.save().
// then(()=>console.log("user saved"))
// .catch(err=>console.log(err))

app.get('/',function(req,res){
    res.send("hello world");
});

const authRoute = require("./router/auth.route");
const userRoute = require("./router/user.route");
app.use("/auth", authRoute);
app.use("/api/users", userRoute);



app.listen(3000);
console.log("server started http://localhost:3000");