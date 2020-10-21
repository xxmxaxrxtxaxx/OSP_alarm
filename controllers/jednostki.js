const { request } = require('express');
var express = require('express');
var router = express.Router();
var bazaJednostek = require('../db/jednostki');
var menu=require('../controllers/menu');

router.get(`/`, async (req, res) => {

    var listaJednostek = [];
    await bazaJednostek.ZnajdzWszystkie().then((wynik) => { listaJednostek = wynik; });

    res.render('jednostki', {
        naglowek: {},
        menu: menu.pobierz(req),
        lista: listaJednostek
    })
});

router.get(`/:idJednostki`, async (req, res) => {
    res.send(req.params["idJednostki"])

});



router.post('/zapisz', (req, res) => {
    res.send("trzecipost")
});



module.exports = router;