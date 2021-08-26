const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts');


//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Route
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server Started on Port: ${port}`));