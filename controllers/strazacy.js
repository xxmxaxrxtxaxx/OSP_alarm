var express = require('express');
var router = express.Router();
var bazaStrazakow = require('../db/uzytkownicy');
var bazaStrazakow2=require('../db/strazacy');
var menu=require('../controllers/menu');
var Model=require('../models/uzytkownik');
const Uzytkownik = require('../models/uzytkownik');

router.get(`/:idJednostki`, async (req, res) => {

    var listaStrazakow = [];
    await bazaStrazakow.znajdzPoJednostce(req.params.idJednostki).then((wynik) => { listaStrazakow = wynik; });
    

    res.render('strazacy', {
        naglowek: {},
        menu: menu.pobierz(req),
        lista: listaStrazakow,
        idJednostki: req.params.idJednostki
    })
});

router.get(`/usun/:idJednostki/:idStrazaka`, async (req, res) => {

    await bazaStrazakow2.usun(req.params.idStrazaka).then();

    res.render('komunikat',{
        naglowek: {},
         menu: menu.pobierz(req)
    })

    
});

 router.get('/dodajNowego/:idJednostki', async (req, res) => {


     res.render('edycjaUzytkownika', {
        naglowek: {},
         menu: menu.pobierz(req),
         uzytkownik: new Uzytkownik({}),
         idJednostki: req.params.idJednostki

       
     })
 });

router.get('/dodajIstniejacego/:idJednostki', async (req, res) => {

    
     res.render('dodajIstniejacegoStrazaka', {
        naglowek: {},
         menu: menu.pobierz(req),
       
     })
 });

 router.get(`/edytuj/:idJednostki/:idUzytkownika?`, async(req, res)=>{
    

    if(req.params['idUzytkownika']){

        var strazak= await bazaStrazakow2.ZnajdzPoWlasnymId(req.params['idJednostki'], req.params['idUzytkownika'])
        res.render('edycjaStrazaka',{
            naglowek: {},
            menu: menu.pobierz(req),
            strazak: strazak
    
        })

    }else{
        res.render('edycjaUzytkownika',{
            naglowek: {},
            menu: menu.pobierz(req),
            uzytkownik: new Uzytkownik({}),
            idJednostki: req.params['idJednostki']
        })
    }
   
});

module.exports = router;