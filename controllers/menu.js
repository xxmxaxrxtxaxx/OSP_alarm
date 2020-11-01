module.exports={
    pobierz:(req)=>{
        
        return {
        czyZalogowany:req.isAuthenticated(),
        idUzytkownika:(req.user||{}).id,
        bledy: req.flash("error"),
        potwierdzenia: req.flash("success"),
    }}
}