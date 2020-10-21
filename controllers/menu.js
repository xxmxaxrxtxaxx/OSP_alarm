module.exports={
    pobierz:(req)=>{return {
        czyZalogowany:req.isAuthenticated()
    }}
}