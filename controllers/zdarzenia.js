var express = require('express');
var router = express.Router();
var bazaZdarzen = require('../db/zdarzenia');
var menu=require('../controllers/menu');
var Model=require('../models/zdarzenie');

router.get(`/:idJednostki`, async (req, res) => {

    var listaZdarzen = await bazaZdarzen.znajdzPoIdJednostki(req.params.idJednostki);
    

    res.render('zdarzenia', {
        naglowek: {},
        menu: menu.pobierz(req),
        listaZdarzen: listaZdarzen
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


module.exports = router;