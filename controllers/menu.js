module.exports={
    pobierz:(req)=>{return {
        czyZalogowany:req.isAuthenticated(),
        idUzytkownika:(req.user||{}).id
    }}
}