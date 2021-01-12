var express = require('express');
var router = express.Router();
var bazaWezwan = require('../db/wezwania');
var bazaZdarzen=require('../db/zdarzenia');
var Model = require('../models/wezwanie');


router.get(`/wezwanie/:id`, async (req, res) => {
    var wezwanie=await bazaWezwan.ZnajdzPoWlasnymId(req.params.id);


    res.json(wezwanie);

});

router.put(`/wezwanie/:id`, async (req, res) => {
  

    if(req.body.status=="nieznany" || req.body.status=="potwierdzony" || req.body.status=="odrzucony"){
        
        var wezwanie=await bazaWezwan.ZnajdzPoWlasnymId(req.params.id);
        if(wezwanie){
          
            var zdarzenie=await bazaZdarzen.ZnajdzPoWlasnymId(wezwanie.idZdarzenia);
            wezwanie.godzinaOdpowiedzi=new Date();
            //ustaw tylko jeżeli godzina odpowiedzi jesy null
            if(wezwanie.godzinaOdpowiedzi-zdarzenie.data < 15 * 60 * 1000 ){
                res.status(400).json({status: 400, message: "Błąd"});
            }else{
                await bazaWezwan.zmien(wezwanie);
                res.status(200).json({status: 200, message: "Dodane"});
            }
        }else{
         
            res.status(400).json({status: 400, message: "Błąd"});
        }
    }else{
    
        res.status(400).json({status: 400, message: "Błąd"});
    }


});

module.exports = router;