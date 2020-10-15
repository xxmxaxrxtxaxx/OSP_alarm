const Zdarzenie = require("../models/zdarzenie");

module.exports = {
    znajdzPoIdJednostki: (idJednostki) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`select id, id_jednostki, data, opis, id_alarmujacego from zdarzenie where id_jednostki='${idJednostki}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    var zdarzenia = [];
                    for (var i = 0; i < wyniki.length; i++) {
                        var w = wyniki[i];
                        zdarzenia.push(new Zdarzenie(w.id, w.id_jednostki, w.data, w.opis, w.id_alarmujacego))
                    }
                    resolve(zdarzenia);
                });
        })

    },
    ZnajdzPoWlasnymId: (idZdarzenia) =>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select id, id_jednostki, data, opis, id_alarmujacego from zdarzenie where id='${idZdarzenia}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    if(wyniki.length>0){
                        var w = wyniki[0];
                        resolve(new Zdarzenie(w.id, w.id_jednostki, w.data, w.opis, w.id_alarmujacego));

                    }else{
                      resolve(null);  
                    }
                    
                });
        })
    },
    usun: (idZdarzenia) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`delete from zdarzenie where id=${idZdarzenia}`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    resolve(wyniki);
                });
        })
    }
}