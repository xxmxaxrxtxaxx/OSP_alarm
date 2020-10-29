const { request } = require('express');
var express = require('express');
var router = express.Router();
var menu=require('../controllers/menu');


router.get(`/`, async (req, res) => {

    res.render('stronaGlowna', {
        naglowek: {},
        menu: menu.pobierz(req),
        czyZalogowany: req.user!=null,
    })


});
    module.exports = router;