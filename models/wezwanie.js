const moment = require('moment');

class Wezwanie{
    constructor(idZdarzenia, idUzytkownika, status, godzinaOdpowiedzi, lokalizacja, id){
    this.idZdarzenia=idZdarzenia;
    this.idUzytkownika=idUzytkownika;
    this.status=status;
    this.godzinaOdpowiedzi=godzinaOdpowiedzi;
    this.lokalizacja=lokalizacja;
    this.id=id;
    };
    godzinaOdpowiedziFormat(){
        return moment(this.godzinaOdpowiedzi).format("DD.MM.YYYY");
    }
   
}
module.exports=Wezwanie;