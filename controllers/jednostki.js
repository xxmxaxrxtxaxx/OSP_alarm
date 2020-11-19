const { request } = require('express');
var express = require('express');
var router = express.Router();
var bazaJednostek = require('../db/jednostki');
var menu = require('../controllers/menu');
var Model = require('../models/jednostka');


var odczyt = (req, res, next) =>{
 if(req.isAuthenticated()){
    //  if(req.params.idJednostki){
    //    if(req.user.czyStrazak(idJednostki) || req.user.czyAdminJednostki(idJednostki) || req.user.czyAdmin || req.user.czyAlarmujacy(idJednostki)){
    //        next();
    //    }else{
    //     req.flash('error', "Brak uprawnień");
    //     return res.redirect('/'); 
    //    }
    //  }
    return next();
 }else{
    req.flash('error', "Brak dostępu dla nie zalogowanych");
    return res.redirect('/'); 
 }
};
var edycja = (req, res, next) =>{
    if(req.isAuthenticated()){
        if(req.params.idJednostki){
           if( req.user.czyAdminJednostki(req.params.idJednostki) || req.user.czyAdmin){
            return next();
           }else{
            req.flash('error', "Brak uprawnień");
            return res.redirect('/'); 
           }
         }
         return next();
     }else{
        req.flash('error', "Brak dostępu dla nie zalogowanych");
        return res.redirect('/'); 
     }
};


router.get(`/`, odczyt, async (req, res) => {

    var listaJednostek = [];


    if (req.user.czyAdmin) {
        listaJednostek = await bazaJednostek.ZnajdzWszystkie();
    }
    else {
        await bazaJednostek.ZnajdzPoIdStrazaka(req.user.id).then((jednostki) => { listaJednostek = jednostki; });

    }
    res.render('jednostki', {
        naglowek: {},
        menu: menu.pobierz(req),
        lista: listaJednostek
    })
});


router.get(`/edycja/:idJednostki?`,edycja, async (req, res) => {
    var jednostka = {};

    if (req.params['idJednostki']) {
        jednostka = await bazaJednostek.ZnajdzPoWlasnymId(req.params['idJednostki']);
    }
    res.render('edycjaJednostki', {
        naglowek: {},
        menu: menu.pobierz(req),
        jednostka: jednostka,


    })
});

router.post('/edycja', async (req, res) => {
    var jednostka = new Model(req.body);
    var bledy = jednostka.waliduj();
    if (bledy.length>0) {
        for (var i = 0; i < bledy.length; i++) {
            req.flash('error', bledy[i]);
        }
        
        res.render('edycjaJednostki', {
            naglowek: {},
            menu: menu.pobierz(req),
            jednostka: jednostka,
    
    
        })



    } else if (jednostka.id) {
        await bazaJednostek.edytuj(jednostka);
        req.flash('success', "Edytowano dane jednostki");
    } else {
        await bazaJednostek.wstaw(jednostka);
        req.flash('success', "Dodano nową jednostkę");
    }
    res.redirect('/jednostki');

});

router.get(`/usun/:idJednostki`,edycja, async (req, res) => {

    await bazaJednostek.usun(req.params.idJednostki).then();

    req.flash('success', "Usunięto jednostkę");

    res.redirect(`/jednostki`);

});

module.exports = router;