const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
require('./config/passport')(passport);

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/nodePassportLogin', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//bodyParser
app.use(express.urlencoded({extended:false}));


//use express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect Flash
app.use(flash());


//create Global Variable
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
     res.locals.error = req.flash('error');
    next(); 
});


//Route
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server Started on Port: ${port}`));