class Uprawnienia {
    constructor(pola) {
    this.id=pola.idUzytkownika;
    this.czyAdmin=pola.czyAdmin;
    this.administrowaneJednostki=pola.administrowaneJednostki;
    this.strazakWJednostkach=pola.strazakWJednostkach;
    this.alarmujacy=pola.alarmujacy;
    }
    czyAdminJednostki(idJednostki){
        return this.administrowaneJednostki.indexOf(parseInt(idJednostki)) > -1;
    }
    czyAlarmujący(idJednostki){
        return this.alarmujacy.indexOf(parseInt(idJednostki)) > -1;
    }
    czyStrazak(idJednostki){
        return this.strazakWJednostkach.indexOf(parseInt(idJednostki)) > -1;
    }
}
module.exports = Uprawnienia;