const Model = require("../models/uprawnienia");


var ZnajdzAdministrowaneJednostki= (idUzytkownika) => {
    return new Promise((resolve, reject) => {
        global.baza.query(`select j.id 
    from jednostka j join admin_jednostki a on j.id=a.id_jednostki
    where a.id_uzytkownika=${idUzytkownika}`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                resolve(wyniki.map(i=>i.id));
            });
    })

};
var ZnajdzJednostkiAlarmujacego= (idUzytkownika) => {
    return new Promise((resolve, reject) => {
        global.baza.query(`select j.id
    from jednostka j join alarmujacy a on j.id=a.id_jednostki
    where a.id_uzytkownika=${idUzytkownika} `,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);

                resolve(wyniki.map(i=>i.id));

            });
    })

};
var ZnajdzJednostkiStrazaka=  (idUzytkownika) => {
    return new Promise((resolve, reject) => {
        global.baza.query(`select j.id 
    from jednostka j join strazak s on j.id=s.id_jednostki
    where s.id_uzytkownika=${idUzytkownika} `,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);

                resolve(wyniki.map(i=>i.id));

            });
    })

};
var SprawdzCzyAdminSystemu= (idUzytkownika) => {
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

};

var SprawdzCzyAdminJednostki= (idUzytkownika, idJednostki) => {
    return new Promise((resolve, reject) => {
        global.baza.query(`select id_uzytkownika, id_jednostki
    from admin_jednostki
    where id_uzytkownika=${idUzytkownika} and id_jednostki=${idJednostki}`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                if (wyniki.length > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
    })
};

var usunAdminaJednostki = (idJednostki, idUzytkownika) => {
    return new Promise((resolve, reject) => {
        global.baza.query(`delete from admin_jednostki where id_jednostki=${idJednostki} and id_uzytkownika=${idUzytkownika}`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                resolve(wyniki);
            });
    })
};
var wstawAdminaJednostki = (idJednostki, idUzytkownika) => {
    return new Promise((resolve, reject) => {

        global.baza.query(`insert into admin_jednostki (id_jednostki, id_uzytkownika) 
    values (${idJednostki}, ${idUzytkownika})`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);

                resolve(wyniki);
            });
    })
};
var usunAlarmujacego= (idJednostki, idUzytkownika) => {
    return new Promise((resolve, reject) => {
        global.baza.query(`delete from alarmujacy where id_jednostki=${idJednostki} and id_uzytkownika=${idUzytkownika}`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                resolve(wyniki);
            });
    })
};
var wstawAlarmujacego =(idJednostki, idUzytkownika) => {
    return new Promise((resolve, reject) => {

        global.baza.query(`insert into alarmujacy (id_jednostki, id_uzytkownika) 
    values (${idJednostki}, ${idUzytkownika})`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);

                resolve(wyniki);
            });
    })
};

var pobierzUprawanienia = (idUzytkownika) => {
    return new Promise((resolve, reject) => {

        Promise.all([
            ZnajdzAdministrowaneJednostki(idUzytkownika),
            SprawdzCzyAdminSystemu(idUzytkownika),
            ZnajdzJednostkiStrazaka(idUzytkownika),
            ZnajdzJednostkiAlarmujacego(idUzytkownika)]
        ).then(wyniki => {               
            resolve(new Model({
                idUzytkownika: idUzytkownika,
                czyAdmin: wyniki[1],
                administrowaneJednostki: wyniki[0],
                strazakWJednostkach:wyniki[2],
                alarmujacy: wyniki[3]
            }

            ));
        });

    })
}

module.exports = {
    ZnajdzAdministrowaneJednostki:ZnajdzAdministrowaneJednostki,
    ZnajdzJednostkiAlarmujacego:ZnajdzJednostkiAlarmujacego,
    ZnajdzJednostkiStrazaka:ZnajdzJednostkiStrazaka,
    SprawdzCzyAdminSystemu:SprawdzCzyAdminSystemu,
    SprawdzCzyAdminJednostki:SprawdzCzyAdminJednostki,
    usunAdminaJednostki:usunAdminaJednostki,
    wstawAdminaJednostki:wstawAdminaJednostki,
    usunAlarmujacego:usunAlarmujacego,
    wstawAlarmujacego:wstawAlarmujacego,
    pobierzUprawanienia:pobierzUprawanienia
}