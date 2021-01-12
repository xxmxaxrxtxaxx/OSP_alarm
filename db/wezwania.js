const Wezwanie = require("../models/wezwanie");
const moment = require('moment');

module.exports = {

    ZnajdzPoWlasnymId: (idWezwania) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`select id_zdarzenia, id_uzytkownika, status, godzina_odpowiedzi, lokalizacja, id from wezwanie where id='${idWezwania}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    if (wyniki.length > 0) {
                        var w = wyniki[0];
                        resolve(new Wezwanie(w.id_zdarzenia, w.id_uzytkownika, w.status, w.godzina_odpowiedzi, w.lokalizacja, w.id));

                    } else {
                        resolve(null);
                    }

                });
        })
    },
 
    ZnajdzPoIdZdarzenia: (idZdarzenia) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`select id_zdarzenia, id_uzytkownika, status, godzina_odpowiedzi, lokalizacja, id from wezwanie where id_zdarzenia='${idZdarzenia}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    var wezwania = [];
                    for (var i = 0; i < wyniki.length; i++) {
                        var w = wyniki[i];
                        wezwania.push(new Wezwanie(w.id_zdarzenia,w.id_uzytkownika,w.status,w.godzina_odpowiedzi,w.lokalizacja,w.id));
                    }
                    resolve(wezwania);

                });
        })
    },
    wstaw: (wezwanie) => {
        return new Promise((resolve, reject) => {

            global.baza.query(`insert into wezwanie (id_uzytkownika, status, godzina_odpowiedzi, lokalizacja, id_zdarzenia) 
            values (${wezwanie.idUzytkownika}, '${wezwanie.status}', ${wezwanie.godzinaOdpowiedzi || null},
             '${wezwanie.lokalizacja}', ${wezwanie.idZdarzenia})`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    resolve(wyniki.insertId);
                });
        })
    },
    zmien: (wezwanie) => {
        
        return new Promise((resolve, reject) => {

            global.baza.query(`update wezwanie set status ='${wezwanie.status}', godzina_odpowiedzi='${moment(wezwanie.godzinaOdpowiedzi).format("YYYY-MM-DD HH:mm:ss")}', lokalizacja='${wezwanie.lokalizacja} ' 
            where id=${wezwanie.id}`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    resolve(wyniki);
                });
        })
    }


}