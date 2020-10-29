var express = require('express');
var router = express.Router();
var bazaStrazakow = require('../db/uzytkownicy');
var menu=require('../controllers/menu');
var Model=require('../models/uzytkownik');


router.get('/:idUzytkownika', async(req,res)=>{
    var uzytkownik={};
   
         uzytkownik= await bazaStrazakow.ZnajdzPoWlasnymId(req.params['idUzytkownika']);   

    res.render('edycjaUzytkownika', {
        naglowek: {},
        menu: menu.pobierz(req),
        uzytkownik: uzytkownik,
        idJednostki: null,
    })
  
});
router.post('/zapisz', async(req, res)=>{
    var uzytkownik=new Model(req.body);
    var idUzytkownika = null;
    if(uzytkownik.id){
        await bazaStrazakow.zmien(uzytkownik);
    }else{
        uzytkownik.haslo=uzytkownik.numerTelefonu;
        idUzytkownika = await bazaStrazakow.wstaw(uzytkownik);
    }
    if(req.body.idJednostki && !uzytkownik.id){
        res.redirect(`/strazacy/edytuj/${req.body.idJednostki}/${idUzytkownika}`);

    }else{
         res.redirect('/jednostki');
    }
   
    
});

router.get('/haslo/:idUzytkownika', async(req,res)=>{
    var uzytkownik={};
   
         uzytkownik= await bazaStrazakow.ZnajdzPoWlasnymId(req.params['idUzytkownika']);
    
    res.render('zmianaHasla', {
        naglowek: {},
        menu: menu.pobierz(req),
        uzytkownik: uzytkownik,
    })
  
});




module.exports = router;