var express = require('express');
var router = express.Router();
var bazaUzytkownikow = require('../db/uzytkownicy');
var bazaStrazakow=require('../db/strazacy');
var bazaUprawnienia=require('../db/uprawnienia');
var menu=require('../controllers/menu');
var Strazak=require('../models/strazak');
const Uzytkownik = require('../models/uzytkownik');

router.get(`/:idJednostki`, async (req, res) => {

    var listaStrazakow = [];
    await bazaUzytkownikow.znajdzPoJednostce(req.params.idJednostki).then((wynik) => { listaStrazakow = wynik; });
    await bazaUzytkownikow.znajdzAlarmujacychPoIdJednostki(req.params.idJednostki).then((wynik) => { listaAlarmujacych = wynik; });
    

    res.render('strazacy', {
        naglowek: {},
        menu: menu.pobierz(req),
        listaAlarmujacych:listaAlarmujacych,
        lista: listaStrazakow,
        idJednostki: req.params.idJednostki
    })
});

router.get(`/usun/:idJednostki/:idStrazaka`, async (req, res) => {

    await bazaStrazakow.usun(req.params['idJednostki'], req.params['idStrazaka']).then();
    req.flash('success', "Usunięto strażaka");
    res.redirect(`/strazacy/${req.params['idJednostki']}`);

    
});
router.get(`/usunAlarmujacego/:idJednostki/:idStrazaka`, async (req, res) => {

    await bazaUprawnienia.usunAlarmujacego(req.params['idJednostki'], req.params['idStrazaka']).then();
    req.flash('success', "Usunięto alarmującego");
    res.redirect(`/strazacy/${req.params['idJednostki']}`);

    
});


 router.get('/dodajNowego/:idJednostki', async (req, res) => {
     res.redirect(`/uzytkownik/?idJednostki=${req.params.idJednostki}&nastepnaStrona=edycjaStrazaka`)

    //  res.render('edycjaUzytkownika', {
    //     naglowek: {},
    //      menu: menu.pobierz(req),
    //      uzytkownik: new Uzytkownik({}),
    //      idJednostki: req.params.idJednostki,
    //      czyAlarmujacy: null
       
    //  })
 });

 router.get('/dodajNowegoAlarmujacego/:idJednostki', async(req, res) =>{
     res.redirect(`/uzytkownik/?idJednostki=${req.params.idJednostki}&nastepnaStrona=edycjaAlarmujacego`)

 });

router.get('/dodajIstniejacego/:idJednostki', async (req, res) => {

    
      res.render('dodajIstniejacegoStrazaka', {
         naglowek: {},
          menu: menu.pobierz(req),
          idJednostki: req.params.idJednostki,
          nastepnaStrona: req.query.nastepnaStrona
       
      })
 });


 router.get(`/zapiszAlarmujacego/:idJednostki/:idUzytkownika`, async (req,res)=>{

//zapisać w bazie alarmującego i redirect do jednostki

 });


 router.post('/:idJednostki/znajdz', async(req, res)=>{
    
     var uzytkownik= await bazaUzytkownikow.znajdzPoNazwie(req.body.login);

     if(uzytkownik){
         if(req.body.nastepnaStrona=="edycjaStrazaka"){
             res.redirect(`/strazacy/edytuj/${req.params.idJednostki}/${uzytkownik.id}`);
         }
         else{
            res.redirect(`/strazacy/zapiszAlarmujacego/${req.params.idJednostki}/${uzytkownik.id}`);
         }
     }
     else{

        req.flash('error', "Nie znaleziono uzytkownika");
                 
        res.render('dodajIstniejacegoStrazaka', {
            naglowek: {},
             menu: menu.pobierz(req),
             idJednostki: req.params.idJednostki,
             nastepnaStrona: req.query.nastepnaStrona,
        })
    }
});




 router.get(`/edytuj/:idJednostki/:idUzytkownika?`, async(req, res)=>{
    

    if(req.params['idUzytkownika']){
        

        var strazak= await bazaStrazakow.ZnajdzPoWlasnymId(req.params['idJednostki'], req.params['idUzytkownika'])
        if(!strazak){
            strazak= new Strazak({idJednostki: req.params['idJednostki'], idUzytkownika: req.params['idUzytkownika']});
        }
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

router.post('/:idJednostki/:idUzytkownika/zapisz', async(req, res)=>{
   var daneStrazaka = await bazaStrazakow.ZnajdzPoWlasnymId(req.params['idUzytkownika'],req.params['idJednostki']);
   var strazak=new Strazak(req.body);
    if(daneStrazaka){
        await bazaStrazakow.zmien(strazak);
    }else{
        await bazaStrazakow.wstaw(strazak);
    }

    if(req.body.admin){
        //sprawdz czy juz jest adminem
        //wstaw nowego admina
    }else{
        //usuń admina
    }

    req.flash('success', "Zapisano");
    res.redirect(`/strazacy/${req.params['idJednostki']}`);
    
    
});





module.exports = router;