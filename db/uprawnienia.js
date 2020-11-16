//const Uprawnienia = require("../models/uprawnienia");


module.exports = {

ZnajdzAdministrowaneJednostki:(idUzytkownika)=>{
    return new Promise((resolve, reject) => {
        global.baza.query(`select j.id, j.nazwa, j.adres 
        from jednostka j join admin_jednostki a on j.id=a.id_jednostki
        where a.id_uzytkownika=${idUzytkownika}`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                for (var i = 0; i < wyniki.length; i++) {
                    var w = wyniki[i];
                }
                resolve(wyniki);
                
            });
    })

},
ZnajdzJednostkiAlarmujacego:(idUzytkownika)=>{
    return new Promise((resolve, reject) => {
        global.baza.query(`select j.id, j.nazwa, j.adres 
        from jednostka j join alarmujacy a on j.id=a.id_jednostki
        where a.id_uzytkownika=${idUzytkownika} `,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                for (var i = 0; i < wyniki.length; i++) {
                    var w = wyniki[i];
                }
                resolve(wyniki);
                
            });
    })

},
ZnajdzJednostkiStrazaka:(idUzytkownika)=>{
    return new Promise((resolve, reject) => {
        global.baza.query(`select j.id, j.nazwa, j.adres 
        from jednostka j join strazak s on j.id=s.id_jednostki
        where s.id_uzytkownika=${idUzytkownika} `,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                for (var i = 0; i < wyniki.length; i++) {
                    var w = wyniki[i];
                }
                resolve(wyniki);
                
            });
    })

},
SprawdzCzyAdminSystemu:(idUzytkownika)=>{
    return new Promise((resolve, reject) => {
        global.baza.query(`select id_uzytkownika 
        from admin_systemu
        where id_uzytkownika=${idUzytkownika} `,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                if (wyniki.length > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
    })

},
usunAdminaJednostki: (idJednostki, idUzytkownika) => {
    return new Promise((resolve, reject) => {
        global.baza.query(`delete from admin_jednostki where id_jednostki=${idJednostki} and id_uzytkownika=${idUzytkownika}`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                resolve(wyniki);
            });
    })
},
wstawAdminaJednostki: (adminJednostki) => {
    return new Promise((resolve, reject) => {

        global.baza.query(`insert into admin_jednostki (id_jednostki, id_uzytkownika) 
        values (${adminJednostki.idJednostki}, ${adminJednostki.idUzytkownika})`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                
                resolve(wyniki);
            });
    })
},
usunAlarmujacego: (idJednostki, idUzytkownika) => {
    return new Promise((resolve, reject) => {
        global.baza.query(`delete from alarmujacy where id_jednostki=${idJednostki} and id_uzytkownika=${idUzytkownika}`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                resolve(wyniki);
            });
    })
},
wstawAlarmujacego: (alarmujacy) => {
    return new Promise((resolve, reject) => {

        global.baza.query(`insert into alarmujacy (id_jednostki, id_uzytkownika) 
        values (${alarmujacy.idJednostki}, ${alarmujacy.idUzytkownika})`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                
                resolve(wyniki);
            });
    })
}

}