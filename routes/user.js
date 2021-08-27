const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

//User Models
const User = require('../models/User');
const { route } = require('.');

router.get('/login', function (req, res) {
    res.render('login');
});
router.get('/register', function (req, res) {
    res.render('register');
});


//Handle requests
router.post('/register', function (req, res) {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //check require filled
    if (!email || !name || !password || !password2)
    {
        errors.push({
            msg: 'Please all the fill input...'
        });
    }

    //check password
    if (password !== password2)
    {
        errors.push({ msg: 'password not match...' });
    }

    //check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password must be 6 characters!'})
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user exists already
                    errors.push({ msg: 'email is already registered' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => {
                            //flash message
                            req.flash('success_msg', 'You are Registerd');
                            res.redirect('/user/login');
                        }).catch(err => {
                            console.log(err);
                         });
                    }));
                    
                }
            }).catch(err => {
                
            });
    }
    
});

//login Handle request
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

//lOGOUT Handle
router.get('/logout' , (req , res , next)=>{
    req.logout();
    req.flash('success_msg' , 'You are Logout...');
    res.redirect('/user/login');
});

module.exports = router;