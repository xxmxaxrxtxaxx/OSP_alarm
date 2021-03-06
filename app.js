require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session=require("express-session");
const bazaUzytkownikow=require("./db/uzytkownicy");
const port = process.env.PORT;
const flash = require("connect-flash");
const crypto = require('crypto');
const bazaUprawnienia=require("./db/uprawnienia");


const baza=mysql.createPool(process.env.CLEARDB_DATABASE_URL);
global.baza=baza;
global.passport=passport;

const sessionConfig={
    secret:"klucz",
    resave: false,
    saveUninitialized: true,
}

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'haslo'
},
     (username, password, callback)=> {
        
        bazaUzytkownikow.znajdzPoNazwie(username).then(uzytkownik=>{
            if(uzytkownik){
                password = crypto.createHmac('sha256', password).digest('hex');
                if(password==uzytkownik.haslo){
                    callback(null,uzytkownik);

                }else{
                    callback(null,false,{message:"Błędne Hasło"});
                }

            }
            else{
                callback(null,false,{message:"Brak użytkownika o tej nazwie"});
            }
        })
        
    }
));

passport.serializeUser(
    (uzytkownik, callback)=> {
    callback(null,uzytkownik.id);
});

passport.deserializeUser(
    (identyfikator, callback)=>{
        bazaUprawnienia.pobierzUprawanienia(identyfikator).then(uzytkownik=>{
            callback(null,uzytkownik);
        });
    }
)

const app = express();
app.set('port', port);

app.set('host',"192.168.100.2");
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/assets"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(`/jednostki`,require("./controllers/jednostki"));
app.use(`/strazacy`,require("./controllers/strazacy"));
app.use(`/logowanie`,require("./controllers/logowanie"));
app.use(`/uzytkownik`,require("./controllers/uzytkownik"));
app.use(`/zdarzenia`, require("./controllers/zdarzenia"));
app.use(`/api`, require("./controllers/api"));
app.use(`/`, require("./controllers/stronaGlowna"));




 app.listen(port, ()=>{
     console.log(`Serwer uruchomiony na porcie: ${port}`)
 });

//app.listen(8080,'192.168.100.2' );


