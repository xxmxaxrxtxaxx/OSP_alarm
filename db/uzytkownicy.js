const Uzytkownik = require("../models/uzytkownik");

var konwertuj = (rekordZBazy)=>new Uzytkownik(
    {id:rekordZBazy.id,
    imie: rekordZBazy.imie,
    nazwisko: rekordZBazy.nazwisko,
    numerTelefonu: rekordZBazy.numer_telefonu, 
    login: rekordZBazy.login,
    haslo: rekordZBazy.haslo});

module.exports = {
    znajdzPoNazwie: (nazwa) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`select id, imie, nazwisko, numer_telefonu, login, haslo from uzytkownik where login='${nazwa}'`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    if (wyniki.length > 0) {
                        var w = wyniki[0];
                        resolve(konwertuj(w));
                    } else {
                        resolve(null);
                    }
                });
        })
    },
    znajdzPoJednostce: (idJednostki) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`select u.id, u.imie, u.nazwisko, u.numer_telefonu, u.login, u.haslo 
            from uzytkownik u
            join strazak s on s.id_uzytkownika=u.id 
            where s.id_jednostki=${idJednostki}`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    var uzytkownicy = [];
                    for (var i = 0; i < wyniki.length; i++) {
                        var w = wyniki[i];
                        uzytkownicy.push(konwertuj(w))
                    }
                    resolve(uzytkownicy);
                });
        })
    },
    ZnajdzPoWlasnymId: (idUzytkownika) =>{
        return new Promise((resolve, reject) => {
            global.baza.query(`select id, imie, nazwisko, numer_telefonu, login, haslo from uzytkownik where id=${idUzytkownika}`,
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

    wstaw: (uzytkownik) => {
        return new Promise((resolve, reject) => {

            global.baza.query(`insert into uzytkownik (imie, nazwisko, numer_telefonu, login, haslo) 
            values ('${uzytkownik.imie}', '${uzytkownik.nazwisko}', ${uzytkownik.numerTelefonu},
             '${uzytkownik.login}', '${uzytkownik.haslo}')`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    
                    resolve(wyniki.insertId);
                });
        })
    },

    zmien:(uzytkownik) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`update uzytkownik set imie='${uzytkownik.imie}', nazwisko='${uzytkownik.nazwisko}', numer_telefonu=${uzytkownik.numerTelefonu}
             where id=${uzytkownik.id}`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    
                    resolve(wyniki);
                });
        })
    },

    usun: (idUzytkownika) => {
        return new Promise((resolve, reject) => {
            global.baza.query(`delete from uzytkownik where id=${idUzytkownika}`,
                (blad, wyniki, pola) => {
                    if (blad) reject(blad);
                    resolve(wyniki);
                });
        })
    }

}
