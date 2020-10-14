const Wezwanie = require("../models/wezwanie");

module.exports = {

 ZnajdzPoWlasnymId: (idWezwania) =>{
    return new Promise((resolve, reject) => {
        global.baza.query(`select id_zdarzenia, id_uzytkownika, status, godzina_odpowiedzi, lokalizacja, id from wezwanie where id='${idWezwania}'`,
            (blad, wyniki, pola) => {
                if (blad) reject(blad);
                if(wyniki.length>0){
                    var w = wyniki[0];
                    resolve(new Wezwanie(w.id_zdarzenia, w.id_uzytkownika, w.status, w.godzina_odpowiedzi, w.lokalizacja, w.id));

                }else{
                  resolve(null);  
                }
                
            });
    })
}
}