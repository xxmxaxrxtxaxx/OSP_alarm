class Jednostka {
    constructor(pola) {
        this.id = pola.id;
        this.nazwa = pola.nazwa;
        this.adres = pola.adres;
    }


    waliduj() {
        var bledy = [];

        if (!this.nazwa) {
            bledy.push("Nazwa jednostki nie została podana");
        }
        if (!this.adres) {
            bledy.push("Adres jednostki nie został podany");
        }
        return bledy;
    }

}
module.exports = Jednostka;