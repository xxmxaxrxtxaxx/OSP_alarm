class Uprawnienia {
    constructor(pola) {
    this.idUzytkownika=pola.idUzytkownika;
    this.czyAdmin=pola.czyAdmin;
    this.administrowaneJednostki=pola.administrowaneJednostki;
    this.strazakWJednostkach=pola.strazakWJednostkach;
    }
}
module.exports = Uprawnienia;