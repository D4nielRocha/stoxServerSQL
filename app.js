const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
require('dotenv').config();

app.all('/*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
  });

app.use( (req, res, next) => {
    res.setHeader('Content-type', 'application/json');
    
    next();
})


app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({ credentials: true, origin: true }));
app.options('*', cors()) // include before other routes


// app.use('/', require('./controllers/indexController'));
app.use('/faceoff', require('./controllers/faceoffController'));
app.use('/myaccount', require('./controllers/myaccountController'));
app.use('/user', require('./controllers/userController'));

app.listen(PORT, () => {
    console.log(`Connected at localhost:${PORT}`);
})

module.exports = app;


