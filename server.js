const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var multer = require('multer');
var fs = require('fs');
const port = 5000;
mongoose.connect("mongodb://localhost:27017/nybula", {
useNewUrlParser: true,
useUnifiedTopology: true,
// console.log("Connected");
});
const LoginSchema = {
    username: String,
    password: String,
    confirmpassword:String
};
const Register = mongoose.model("Register", LoginSchema);
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);
app.get('', (req, res) => {
    res.render('register');
});
app.get('/login', (req, res) => {
    res.render('Login');
});
app.post('/login', (req, res) => {
    const login = new Register ({ 
        username:req.body.username,
        password:req.body.password,
        confirmpassword:req.body.confirmPassword,
    });
    login.save();
    res.render("login");
});
app.post('/home',(req, res) => {
      Register.findOne({username:req.body.username})
      .then(user => {
        if (user.password == req.body.password) {
            res.render("register");
        }
        else {
            //   alert("Wrong password");
              res.status(404).send({
                  message: "Wrong password",
              });
      }
});
});
app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
});
