const Strazak = require("../models/strazak");

var konwertuj = (rekordZBazy)=>new Strazak(
    {idJednostki:rekordZBazy.id_jednostki,
    idUzytkownika: rekordZBazy.id_uzytkownika,
    czyKierowca: rekordZBazy.czy_kierowca,
    czyDowodca: rekordZBazy.czy_dowodca, 
    czyKpp: rekordZBazy.czy_kpp});
    

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
    ZnajdzPoWlasnymId: (idStrazaka, idJednostki) =>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select id_jednostki, id_uzytkownika, czy_kierowca, czy_dowodca, czy_kpp from strazak where id_uzytkownika='${idStrazaka}' and id_jednostki='${idJednostki}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    if(wyniki && wyniki.length>0){
                        var w = wyniki[0];
                        resolve(konwertuj(w));

                    }else{
                      resolve(null);  
                    }
                    
                });
        })
    },
    usun: (idJednostki, idStrazaka) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`delete from strazak where id_jednostki=${idJednostki} and id_uzytkownika=${idStrazaka}`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    resolve(wyniki);
                });
        })
    },
    wstaw: (strazak) => {
        return new Promise((resolve, reject) => {

            global.baza.query(`insert into strazak (id_jednostki, id_uzytkownika, czy_kierowca, czy_dowodca, czy_kpp) 
            values ('${strazak.idJednostki}', '${strazak.idUzytkownika}', ${strazak.czyKierowca || 0},
             '${strazak.czyDowodca || 0}', '${strazak.czyKpp || 0}')`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    
                    resolve(wyniki);
                });
        })
    },
    zmien: (strazak) => {
        return new Promise((resolve, reject) => {

            global.baza.query(`update strazak set czy_kierowca='${strazak.czyKierowca}', czy_dowodca='${strazak.czyDowodca}', czy_Kpp='${strazak.czyKpp}' 
            where id_uzytkownika=${strazak.idUzytkownika} and id_jednostki=${strazak.idJednostki}`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    
                    resolve(wyniki);
                });
        })
    }


}
