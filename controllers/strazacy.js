var express = require('express');
var router = express.Router();
var bazaStrazakow = require('../db/uzytkownicy');
var menu=require('../controllers/menu');

router.get(`/:idJednostki`, async (req, res) => {

    var listaStrazakow = [];
    await bazaStrazakow.znajdzPoJednostce(req.params.idJednostki).then((wynik) => { listaStrazakow = wynik; });
    

    res.render('strazacy', {
        naglowek: {},
        menu: menu.pobierz(req),
        lista: listaStrazakow
    })
});

router.get(`/usun/:idJednostki/:idStrazaka`, async (req, res) => {

    await bazaStrazakow.usun(req.params.idJednostki).then();

        res.redirect(`/strazacy/${req.params.idJednostki}`);
    
});


module.exports = router;