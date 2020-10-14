const Strazak = require("../models/strazak");

module.exports = {
    ZnajdzPoIdJednostki: (idJednostki) =>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select id_jednostki, id_uzytkownika, czy_kierowca, czy_dowodca, czy_kpp from strazak where id_jednostki='${idJednostki}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    var strazacy = [];
                    for (var i = 0; i < wyniki.length; i++) {
                        var w = wyniki[i];
                        strazacy.push(new Strazak(w.id_jednostki, w.id_uzytkownika, w.czy_kierowca, w.czy_dowodca, w.czy_kpp))
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
                        resolve(new Strazak(w.id_jednostki, w.id_uzytkownika, w.czy_kierowca, w.czy_dowodca, w.czy_kpp));

                    }else{
                      resolve(null);  
                    }
                    
                });
        })
    }

}
