var express = require('express');
var router = express.Router();
var bazaZdarzen = require('../db/zdarzenia');
var bazaUzytkownikow = require('../db/uzytkownicy');
var bazaWezwan =  require('../db/wezwania');
var menu=require('../controllers/menu');
var Model=require('../models/zdarzenie');

router.get(`/:idJednostki`, async (req, res) => {

    var listaZdarzen = await bazaZdarzen.znajdzPoIdJednostki(req.params.idJednostki);
    

    res.render('zdarzenia', {
        naglowek: {},
        menu: menu.pobierz(req),
        listaZdarzen: listaZdarzen,
        idJednostki:req.params['idJednostki']
    })
});

router.get(`/:idJednostki/dodaj`, async (req, res) => {

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
    
       await bazaZdarzen.wstaw(zdarzenie);
    
    res.redirect('/jednostki');
   
});

router.get('/szczegoly/:idJednostki/:idZdarzenia', async(req, res)=>{
    
    listaWezwanych= await bazaUzytkownikow.znajdzPoJednostce(req.params['idJednostki']);
 //  var listaInformacji = await bazaWezwan.ZnajdzPoIdUzytkownika(listaWezwanych.id);

    res.render('szczegolyAlarmu', {
        naglowek: {},
        menu: menu.pobierz(req),
        listaWezwanych:listaWezwanych,
    //    listaInformacji:listaInformacji
        
    })

});


module.exports = router;