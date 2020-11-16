class Strazak{
    constructor(pola){
        this.idJednostki=pola.idJednostki;
        this.idUzytkownika=pola.idUzytkownika;
        this.czyKierowca=pola.czyKierowca;
        this.czyDowodca=pola.czyDowodca;
        this.czyKpp=pola.czyKpp;
    }
    wyswietlFunkcje(){
        var dostepneFunkcje=[];
       
        if(this.czyDowodca){
         dostepneFunkcje.push("Dowódca");
        } 
        if(this.czyKierowca){
            dostepneFunkcje.push("Kierowca");
        }
        if(this.czyKpp){
            dostepneFunkcje.push("KPP");
        }

        return dostepneFunkcje.join();
    }

}
module.exports=Strazak;