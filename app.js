const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/nodePassportLogin', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoose connected');
    }).catch(err => {
        console.log(err);
    });
mongoose.Promise = global.Promise;

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//bodyParser
app.use(express.urlencoded({extended:false}));

//Route
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server Started on Port: ${port}`));