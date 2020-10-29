class Uzytkownik{
    constructor(pola){
    this.id=pola.id;
    this.imie=pola.imie;
    this.nazwisko=pola.nazwisko;
    this.numerTelefonu=pola.numerTelefonu;
    this.login=pola.login;
    this.haslo=pola.haslo;
    this.czyAdmin=false;
    this.administrowaneJednostki= [];
    }

czyMozeEdytowac(idJednostki){return czyAdmin==true || administrowaneJednostki.indexOf(idJednostki)>-1}
}
module.exports=Uzytkownik;