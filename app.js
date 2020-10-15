require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
//const Uzytkownik = require("./models/uzytkownik");

const port = process.env.port;


const baza=mysql.createPool(process.env.connection_strig);
global.baza=baza;





// require("./db/uzytkownicy").usun(7).then((result)=>{
//     console.log(result);
// },error=>{
//     console.log(error);
// });



// baza.query("select * from straz.strazak",(err, result, fields)=>{
//     if (err) throw err;
//     console.log(result[0]);
// });



const app = express();
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/assets"));




app.use(`/jednostki`,require("./controllers/jednostki"));

 //app.use(`/`,(req,res)=>{res.send("Strona Główna")});

app.listen(port, ()=>{
    console.log(`Serwer uruchomiony na porcie: ${port}`)
});


