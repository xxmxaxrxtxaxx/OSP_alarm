class Wezwanie{
    constructor(idZdarzenia, idUzytkownika, status, godzinaOdpowiedzi, lokalizacja, id){
    this.idZdarzenia=idZdarzenia;
    this.idUzytkownika=idUzytkownika;
    this.status=status;
    this.godzinaOdpowiedzi=godzinaOdpowiedzi;
    this.lokalizacja=lokalizacja;
    this.id=id;
    }
}
module.exports=Wezwanie;