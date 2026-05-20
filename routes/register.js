var express = require('express');
var router = express.Router();
const User= require('../models/User');

router.get('/', function(req, res, next) {
    res.render('register', {message: ''});

});

router.post('/', async function (req, res, next) {
    const {email, password, confirmPassword} = req.body;
    if(password !== confirmPassword) {
        return res.render('register', {message:'Passwords dont match!'});
    }
    if(password.length < 8) {
        return res.render('register', {message:'Password must be at least 8 characters long!'});
    }

    try {
     const user = await User.findOne({email: email});
     if(user) {
         return res.redirect('register', {massage: "user already exist!"});
     }
     const newUser= new User({email, password})
     await newUser.save();

     req.session.user = email;

     res.redirect('/blogs');

    }catch(err) {
        console.log()
    }
});

module.exports = router;