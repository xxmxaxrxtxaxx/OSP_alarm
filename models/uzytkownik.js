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

waliduj(){
    var bledy=[];

    if(!this.imie){
        bledy.push("Imie nie zostało podane");
    }
    if(!this.nazwisko){
        bledy.push("Nazwisko nie zostało podane");
    }
    if(!this.numerTelefonu || this.numerTelefonu.length<9){
        bledy.push("Numer telefonu jest niepoprawny");
    }
    if(!this.login){
        bledy.push("Login nie został podany");
    }
    

    return bledy;
}

}


module.exports=Uzytkownik;