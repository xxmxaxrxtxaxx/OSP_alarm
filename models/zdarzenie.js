const moment = require('moment');

class Zdarzenie{
    constructor(id, idJednostki, data, opis, idAlarmujacego){
    this.id=id;
    this.idJednostki=idJednostki;
    this.data=data;
    this.opis=opis;
    this.idAlarmujacego=idAlarmujacego;
    
    };
    dataFormat(){
        return moment(this.data).format("l");
    }

}
module.exports=Zdarzenie;