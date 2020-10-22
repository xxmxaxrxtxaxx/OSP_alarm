const { request } = require('express');
var express = require('express');
var router = express.Router();
const passport = require('passport');
var menu=require('../controllers/menu');

router.post('/',
    passport.authenticate('local',{successRedirect: '/jednostki', failureRedirect: '/logowanie', })
    
);

router.get('/', (req,res)=>{
    res.render('logowanie', {

    })
  
});

router.get('/wyloguj',(req,res)=>{
    req.logOut();
    res.redirect('./');
});

module.exports = router;