class Uzytkownik{
    constructor(id, imie, nazwisko, numerTelefonu, login, haslo){
    this.id=id;
    this.imie=imie;
    this.nazwisko=nazwisko;
    this.numerTelefonu=numerTelefonu;
    this.login=login;
    this.haslo=haslo;
    this.czyAdmin=false;
    this.administrowaneJednostki= [];
    }

czyMozeEdytowac(idJednostki){return czyAdmin==true || administrowaneJednostki.indexOf(idJednostki)>-1}
}
module.exports=Uzytkownik;