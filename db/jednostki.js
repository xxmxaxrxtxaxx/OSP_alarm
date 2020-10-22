const Jednostka = require("../models/jednostka");

var konwertuj = (rekordZBazy)=>new Jednostka(
    {id:rekordZBazy.id,
       nazwa:  rekordZBazy.nazwa,
       adres:   rekordZBazy.adres});

module.exports = {
    ZnajdzPoIdStrazaka: (idStrazaka) =>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select j.id, j.nazwa, j.adres 
            from jednostka j join strazak s on j.id=s.id_jednostki
            where s.id_uzytkownika=${idStrazaka} `,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    var listaJednostek=[];
                    for(var i=0;i<wyniki.length;i++){
                       var w = wyniki[i]; 
                       listaJednostek.push(konwertuj(w));

                    }
                   resolve(listaJednostek);
                    
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
                        resolve(konwertuj(w));

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
                        resolve(konwertuj(w));

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
                        jednostki.push(konwertuj(w));
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

            global.baza.query(`insert into jednostka (nazwa, adres) 
            values ('${jednostka.nazwa}', '${jednostka.adres}')`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    
                    resolve(wyniki);
                });
        })
    },

    edytuj: (jednostka)=>{
        return new Promise((resolve, reject) => {

            global.baza.query(`update jednostka set nazwa='${jednostka.nazwa}', adres='${jednostka.adres}' where id=${jednostka.id}`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    
                    resolve(wyniki);
                });
        })
    }
}