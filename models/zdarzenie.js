const moment = require('moment');

class Zdarzenie{
    constructor(pola){
    this.id=pola.id;
    this.idJednostki=pola.idJednostki;
    this.data=pola.data;
    this.opis=pola.opis;
    this.idAlarmujacego=pola.idAlarmujacego;
    
    };
    dataFormat(){
        return moment(this.data).format("DD.MM.YYYY");
    }

}
module.exports=Zdarzenie;