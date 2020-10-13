require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

const baza=mysql.createPool(process.env.connection_strig);
global.baza=baza;



require("./db/uzytkownicy").znajdzPoJednostce(1).then((result)=>{
    console.log(result);
},error=>{
    console.log(error);
});

// baza.query("select * from straz.strazak",(err, result, fields)=>{
//     if (err) throw err;
//     console.log(result[0]);
// });



const app = express();
const port = process.env.port;

app.get(`/`,(req,res)=>{res.send("OK")});

app.listen(port, ()=>{
    console.log(`Serwer uruchomiony na porcie: ${port}`)
});


