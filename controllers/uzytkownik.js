var express = require('express');
var router = express.Router();
var bazaStrazakow = require('../db/uzytkownicy');
var menu = require('../controllers/menu');
var Model = require('../models/uzytkownik');
const crypto = require('crypto');


router.get('/:idUzytkownika', async (req, res) => {
    var uzytkownik = {};

    uzytkownik = await bazaStrazakow.ZnajdzPoWlasnymId(req.params['idUzytkownika']);

    res.render('edycjaUzytkownika', {
        naglowek: {},
        menu: menu.pobierz(req),
        uzytkownik: uzytkownik,
        idJednostki: null,
    })

});
router.post('/zapisz', async (req, res) => {
    var uzytkownik = new Model(req.body);
    var idUzytkownika = null;
    var bledy=uzytkownik.waliduj();

    if(bledy.length>0){
        for(var i =0; i<bledy.length; i++){
            req.flash('error', bledy[i]);
            
        }
        res.render('edycjaUzytkownika', {
            naglowek: {},
            menu: menu.pobierz(req),
            uzytkownik: uzytkownik,
            idJednostki: req.body.idJednostki,
        })
        
    }else if (uzytkownik.id) {
        await bazaStrazakow.zmien(uzytkownik);
        req.flash('success', "Dane zostały zmienione");

    } else {
        if (await bazaStrazakow.znajdzPoNazwie(uzytkownik.login) == null) {

            uzytkownik.haslo = uzytkownik.numerTelefonu;
            uzytkownik.haslo = crypto.createHmac('sha256', uzytkownik.haslo).digest('hex');
            
            idUzytkownika = await bazaStrazakow.wstaw(uzytkownik);
            if(czyAdmin){
                console.log("tak");
            }
            req.flash('success', "Dodano nowe konto");

            if (req.body.idJednostki && !uzytkownik.id) {
                res.redirect(`/strazacy/edytuj/${req.body.idJednostki}/${idUzytkownika}`);

            } else {
                res.redirect('/stronaGlowna');
            }

        } else {
            req.flash('error', "Istnieje użytkownik o takiej nazwie");
            res.redirect('/jednostki');
        }
    }

});

router.get('/haslo/:idUzytkownika', async (req, res) => {
    var uzytkownik = {};

    uzytkownik = await bazaStrazakow.ZnajdzPoWlasnymId(req.params['idUzytkownika']);

    res.render('zmianaHasla', {
        naglowek: {},
        menu: menu.pobierz(req),
        uzytkownik: uzytkownik,
    })

});

router.post('/zapiszHaslo/:idUzytkownika', async (req, res) => {
    var uzytkownik = new Model(req.body);
    var daneUzytkownika=await bazaStrazakow.ZnajdzPoWlasnymId(req.params['idUzytkownika']);


    uzytkownik.haslo = crypto.createHmac('sha256', uzytkownik.haslo).digest('hex');

    if(daneUzytkownika.haslo==uzytkownik.haslo){
        if(req.body.noweHaslo==req.body.powtorzHaslo){
            uzytkownik.haslo = crypto.createHmac('sha256', req.body.noweHaslo).digest('hex');
           // uzytkownik.haslo=req.body.noweHaslo;
            await bazaStrazakow.zmienHaslo(uzytkownik);
            req.flash('success', "Hasło zostało zmienione");
            res.redirect(`/uzytkownik/${req.params['idUzytkownika']}`);

        }else{
            req.flash('error', "Hasła nie są identyczne");
            res.redirect(`/uzytkownik/haslo/${req.params['idUzytkownika']}`);
        }

    }else{
        req.flash('error', "Sprawdź czy poprawnie wpisałeś swoje hasło");
        res.redirect(`/uzytkownik/haslo/${req.params['idUzytkownika']}`);
    }
});

module.exports = router;