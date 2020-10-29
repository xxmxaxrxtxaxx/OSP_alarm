const Strazak = require("../models/strazak");

var konwertuj = (rekordZBazy)=>new Strazak(
    {id:rekordZBazy.idJednostki,
    idUzytkownika: rekordZBazy.idUzytkownika,
    czyKierowca: rekordZBazy.czyKierowca,
    czyDowodca: rekordZBazy.czyDowodca, 
    czyKpp: rekordZBazy.czyKpp});
    

module.exports = {
    ZnajdzPoIdJednostki: (idJednostki) =>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select id_jednostki, id_uzytkownika, czy_kierowca, czy_dowodca, czy_kpp from strazak where id_jednostki='${idJednostki}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    var strazacy = [];
                    for (var i = 0; i < wyniki.length; i++) {
                        var w = wyniki[i];
                        strazacy.push(konwertu(w))
                    }
                    resolve(strazacy);
                });
        })
    },
    ZnajdzPoWlasnymId: (idStrazaka) =>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select id_jednostki, id_uzytkownika, czy_kierowca, czy_dowodca, czy_kpp from strazak where id_uzytkownika='${idStrazaka}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    if(wyniki.length>0){
                        var w = wyniki[0];
                        resolve(konwertuj(w));

                    }else{
                      resolve(null);  
                    }
                    
                });
        })
    },
    usun: (idStrazaka) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`delete from strazak where id_uzytkownika=${idStrazaka}`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    resolve(wyniki);
                });
        })
    }

}
