const { request } = require('express');
var express = require('express');
var router = express.Router();
var bazaJednostek = require('../db/jednostki');
var menu=require('../controllers/menu');
var Model=require('../models/jednostka');

router.get(`/`, async (req, res) => {

    var listaJednostek = [];


    if(req.user.czyAdmin){
        listaJednostek = await bazaJednostek.ZnajdzWszystkie();
    }
    else{
        await bazaJednostek.ZnajdzPoIdStrazaka(req.user.id).then((jednostki)=>{listaJednostek=jednostki;});

}
    res.render('jednostki', {
        naglowek: {},
        menu: menu.pobierz(req),
        lista: listaJednostek
    })
});


router.get(`/edycja/:idJednostki?`, async(req, res)=>{
    var jednostka={};

    if(req.params['idJednostki']){
        jednostka= await bazaJednostek.ZnajdzPoWlasnymId(req.params['idJednostki']);
    }
    res.render('edycjaJednostki',{
        naglowek: {},
        menu: menu.pobierz(req),
        jednostka: jednostka,


    })
});

router.post('/edycja', async(req, res)=>{
    var jednostka=new Model(req.body);
    if(jednostka.id){
        await bazaJednostek.edytuj(jednostka);
    }else{
       await bazaJednostek.wstaw(jednostka);
    }
    res.redirect('/jednostki');
    
});

module.exports = router;