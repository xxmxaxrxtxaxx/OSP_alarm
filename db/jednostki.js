const Jednostka = require("../models/jednostka");

var konwertuj = (rekordZBazy)=>new Jednostka(
    {id:rekordZBazy.id,
       nazwa:  rekordZBazy.nazwa,
       adres:   rekordZBazy.adres});

module.exports = {

    ZnajdzPoIdUzytkownika: (idUzytkownika) =>{
        return new Promise((resolve, reject) => {
            global.baza.query(`SELECT  j.id, j.nazwa, j.adres FROM jednostka j
            JOIN admin_systemu a ON a.id_uzytkownika = ${idUzytkownika} 
            UNION DISTINCT SELECT j.id, j.nazwa, j.adres FROM jednostka j 
            JOIN admin_jednostki aj ON j.id = aj.id_jednostki
            WHERE aj.id_uzytkownika = ${idUzytkownika} 
            UNION DISTINCT SELECT j.id, j.nazwa, j.adres FROM jednostka j 
            JOIN alarmujacy al ON j.id = al.id_jednostki
            WHERE al.id_uzytkownika = ${idUzytkownika} 
            UNION DISTINCT SELECT j.id, j.nazwa, j.adres FROM jednostka j 
            JOIN strazak s ON j.id = s.id_jednostki
            WHERE s.id_uzytkownika = ${idUzytkownika} `,
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