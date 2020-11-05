const { request } = require('express');
var express = require('express');
var router = express.Router();
const passport = require('passport');
var menu=require('../controllers/menu');

router.post('/',
    passport.authenticate('local',
    {successRedirect: '/stronaGlowna', 
     failureRedirect: '/logowanie', 
     failureFlash: true,
     badRequestMessage : 'Uzupełnij wszystkie pola' })
   
);

router.get('/', (req,res)=>{
    res.render('logowanie', {
        menu: menu.pobierz(req),
        
    })
});

router.get('/wyloguj',(req,res)=>{
    req.logOut();
    res.redirect('./');
    
});

module.exports = router;