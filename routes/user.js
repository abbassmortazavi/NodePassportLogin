const express = require('express');

const router = express.Router();


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
        res.send(req.body);
    }
    
});

module.exports = router;