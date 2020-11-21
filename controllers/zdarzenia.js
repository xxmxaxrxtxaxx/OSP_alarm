var express = require('express');
var router = express.Router();
var bazaZdarzen = require('../db/zdarzenia');
var bazaUzytkownikow = require('../db/uzytkownicy');
var bazaWezwan =  require('../db/wezwania');
var bazaStrazakow =  require('../db/strazacy');
var menu=require('../controllers/menu');
var Model=require('../models/zdarzenie');
var ModelWezwania=require('../models/wezwanie');

router.get(`/:idJednostki`,(req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.czyStrazak(req.params.idJednostki) || req.user.czyAlarmujacy(req.params.idJednostki) || req.user.czyAdmin || req.user.czyAdminJednostki(req.params.idJednostki)) {
            return next();
        } else {
            req.flash('error', "Brak uprawnień");
            return res.redirect('/');
        }

    } else {
        req.flash('error', "Brak dostępu dla nie zalogowanych");
        return res.redirect('/');
    }

} ,async (req, res) => {

    var listaZdarzen = await bazaZdarzen.znajdzPoIdJednostki(req.params.idJednostki);
    

    res.render('zdarzenia', {
        naglowek: {},
        menu: menu.pobierz(req),
        listaZdarzen: listaZdarzen,
        idJednostki:req.params['idJednostki']
    })
});

router.get(`/:idJednostki/dodaj`, (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.czyAlarmujacy(req.params.idJednostki) || req.user.czyAdmin || req.user.czyAdminJednostki(req.params.idJednostki)) {
            return next();
        } else {
            req.flash('error', "Brak uprawnień");
            return res.redirect('/');
        }

    } else {
        req.flash('error', "Brak dostępu dla nie zalogowanych");
        return res.redirect('/');
    }

}, async (req, res) => {

    res.render('dodajZdarzenie', {
        naglowek: {},
        menu: menu.pobierz(req),
        idJednostki: req.params.idJednostki
        
    })

});


router.post('/:idJednostki/zapisz', async(req, res)=>{

    var zdarzenie=new Model(req.body);
    zdarzenie.idJednostki=req.params.idJednostki;
    zdarzenie.idAlarmujacego=req.user.id;
    var uzytkownicy=await bazaUzytkownikow.znajdzPoJednostce(req.params.idJednostki);


    var idZdarzenia = await bazaZdarzen.wstaw(zdarzenie);

    for(var i=0;i<uzytkownicy.length; i++){
        var wezwanie=new ModelWezwania(idZdarzenia, uzytkownicy[i].id, "nieznany", null, "");
        await bazaWezwan.wstaw(wezwanie);
    }
    
    res.redirect('/jednostki');
   
});

router.get('/szczegoly/:idJednostki/:idZdarzenia',(req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.czyStrazak(req.params.idJednostki) || req.user.czyAlarmujacy(req.params.idJednostki) || req.user.czyAdmin || req.user.czyAdminJednostki(req.params.idJednostki)) {
            return next();
        } else {
            req.flash('error', "Brak uprawnień");
            return res.redirect('/');
        }

    } else {
        req.flash('error', "Brak dostępu dla nie zalogowanych");
        return res.redirect('/');
    }

}, async(req, res)=>{
    
   var listaDoWyswietlenia=[];
   var zdarzenie = await bazaZdarzen.ZnajdzPoWlasnymId(req.params.idZdarzenia);


    listaWezwan= await bazaWezwan.ZnajdzPoIdZdarzenia(req.params.idZdarzenia);
    for(var i=0;i<listaWezwan.length;i++){
        var uzytkownik=await bazaUzytkownikow.ZnajdzPoWlasnymId(listaWezwan[i].idUzytkownika);
        var strazak = await bazaStrazakow.ZnajdzPoWlasnymId(uzytkownik.id, req.params.idJednostki);
        listaDoWyswietlenia.push({
            imie:uzytkownik.imie, 
            nazwisko:uzytkownik.nazwisko, 
            godzinaOdpowiedzi:listaWezwan[i].godzinaOdpowiedzi, 
            status:listaWezwan[i].status, 
            lokalizacja: listaWezwan[i].lokalizacja,
            funkcja: strazak.wyswietlFunkcje(),
            opis: zdarzenie.opis,
        })
           
    }
 
    res.render('szczegolyAlarmu', {
        naglowek: {},
        menu: menu.pobierz(req),
        listaDoWyswietlenia: listaDoWyswietlenia,
   
        
    })

});


module.exports = router;