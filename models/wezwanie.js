class Wezwanie{
    constructor(idZdarzenia, idUzytkownika, status, godzinaOdpowiedzi, lokalizacja){
    this.idZdarzenia=idZdarzenia;
    this.idUzytkownika=idUzytkownika;
    this.status=status;
    this.godzinaOdpowiedzi=godzinaOdpowiedzi;
    this.lokalizacja=lokalizacja;
    }
}
module.exports=Wezwanie;