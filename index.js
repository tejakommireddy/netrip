const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const session = require('express-session');
const auth = require('./routes/auth');
const mysql = require('mysql');
const {
  con,
  sessionStore
} = require('./config/db');
const fs = require('fs');

require('dotenv').config({
  path: path.join(__dirname, '.env')
});
const port = process.env.PORT || 3000;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

//static files 
app.use(express.static('public'))
app.use('/css' , express.static(__dirname + 'public/css'))
app.use('/imgs' , express.static(__dirname + 'public/imgs'))

var sess = {
    secret: 'keyboard cat',
    store: sessionStore,
    cookie: {
      httpOnly: false,
    },
    resave: false,
    saveUninitialized: false
  }
  
  app.use(session(sess));
  app.use(fileUpload());
//set views
app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('/', routes.index22);

app.get('/', (req,res) =>{
    res.render('index22')
});
app.get('/login', (req, res) => {
    res.render('login');
   });

   let s;

const loginRequired = (req, res, next) => {
    if (req.session.username) {
    s = req.session;
    next();
    } else {
    res.redirect('/auth/login');
    }
};

 app.get('/Sikkim', (req, res) => {
  res.render('Sikkim');
 });
  app.get('/meghalaya', (req, res) => {
  res.render('meghalaya');
 });
 app.get('/Nagaland', (req, res) => {
  res.render('Nagaland');
 });
 app.get('/Assam', (req, res) => {
  res.render('Assam');
 });
  app.get('/Mizoram', (req, res) => {
  res.render('Mizoram');
 });
  app.get('/Manipur', (req, res) => {
  res.render('Manipur');
 });
 app.get('/Arunachal', (req, res) => {
  res.render('Arunachal');
 });
  app.get('/Tripura', (req, res) => {
  res.render('Tripura');
 });

app.get('/', (req, res) => {
  res.redirect('/Sikkim');
});
app.get('/', (req, res) => {
  res.redirect('/meghalaya');
});
app.get('/', (req, res) => {
  res.redirect('/Nagaland');
});
 app.get('/', (req, res) => {
  res.redirect('/Assam');
});
app.get('/', (req, res) => {
  res.redirect('/Mizoram');
});
app.get('/', (req, res) => {
  res.redirect('/Manipur');
});
app.get('/', (req, res) => {
  res.redirect('/Arunachal');
});
app.get('/', (req, res) => {
  res.redirect('/Tripura');
});
 
app.get('/new/:usernameOrEmail', loginRequired, routes.new);
app.post('/', loginRequired, routes.new);

// app.get('/show/:username/:category', loginRequired, routes.show);
app.get('/show/:username', loginRequired, routes.show);
// app.post('/', loginRequired, routes.show);


app.get('/:username', loginRequired, routes.index22);

app.use('/auth', auth);


app.listen(port, () => console.log(`listening on http://${process.env.HOST}:${port}`));




