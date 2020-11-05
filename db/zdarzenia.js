const Zdarzenie = require("../models/zdarzenie");

var konwertuj = (rekordZBazy)=>new Zdarzenie(
    {id:rekordZBazy.id,
    data: rekordZBazy.data,
    opis: rekordZBazy.opis,
    idAlarmujacego: rekordZBazy.id_alarmujacego});

module.exports = {
    znajdzPoIdJednostki: (idJednostki) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`select id, id_jednostki, data, opis, id_alarmujacego from zdarzenie where id_jednostki='${idJednostki}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    var zdarzenia = [];
                    for (var i = 0; i < wyniki.length; i++) {
                        var w = wyniki[i];
                        zdarzenia.push(konwertuj(w))
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
                        resolve(konwertuj(w));

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
    },

    wstaw: (zdarzenie) => {
        return new Promise((resolve, reject) => {
            var aktualnaData= global.baza.query(`select getDate()`);

            global.baza.query(`insert into zdarzenie (id_jednostki, data, opis, id_alarmujacego) 
            values ('${zdarzenie.idJednostki}', CURDATE(), '${zdarzenie.opis}', '${zdarzenie.idAlarmujacego}')`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    
                    resolve(wyniki);
                });
        })
    }
}