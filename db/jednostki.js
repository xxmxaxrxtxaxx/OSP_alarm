const Jednostka = require("../models/jednostka");

module.exports = {
    ZnajdzPoIdStrazaka: (idStrazaka) =>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select j.id, j.nazwa, j.adres 
            from jednostka j join strazak s on j.id=s.id_jednostki
            where s.id_uzytkownika=${idStrazaka} `,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    if(wyniki.length>0){
                        var w = wyniki[0];
                        resolve(new Jednostka(w.id, w.nazwa, w.adres));

                    }else{
                      resolve(null);  
                    }
                    
                });
        })
    },
    ZnajdzPoWlasnymId: (idJednostki) =>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select id, nazwa, adres from jednostka where id='${idJednostki}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    if(wyniki.length>0){
                        var w = wyniki[0];
                        resolve(new Jednostka(w.id, w.nazwa, w.adres));

                    }else{
                      resolve(null);  
                    }
                    
                });
        })
    },
    ZnajdzPoIdAdministratoraJednostki: (idAdministratoraJednostki)=>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select j.id, j.nazwa, j.adres 
            from jednostka j join admin_jednostki a on j.id=a.id_jednostki
            where id_uzytkownika='${idAdministratoraJednostki}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    if(wyniki.length>0){
                        var w = wyniki[0];
                        resolve(new Jednostka(w.id, w.nazwa, w.adres));

                    }else{
                      resolve(null);  
                    }
                    
                });
        })

    },
    ZnajdzWszystkie: ()=>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select id, nazwa, adres 
            from jednostka`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);

                    var jednostki = [];
                    for (var i = 0; i < wyniki.length; i++) {
                        var w = wyniki[i];
                        jednostki.push(new Jednostka(w.id, w.nazwa, w.adres));
                    }
                    resolve(jednostki);
                    
                });
        })

    },
    usun: (idJednostki) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`delete from jednostka where id=${idJednostki}`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    resolve(wyniki);
                });
        })
    },
    wstaw: (jednostka) => {
        return new Promise((resolve, reject) => {

            global.baza.query(`insert into jednostka (id, nazwa, adres) 
            values (${jednostka.id}, '${jednostka.nazwa}', '${jednostka.adres}')`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    
                    resolve(wyniki);
                });
        })
    }
}