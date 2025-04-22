const express = require("express");

const sql = require ("mssql/msnodesqlv8");
const app = express();

app.use(express.json());
app.use(express.urlcoded({extended: true}));

if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

var config = {
    server:process.env.SERVER,
    database: process.env.DATABASE,
    driver:process.env.DRIVER,
    options:{
        trustedConnection:false,
    },
};

const db =sql.connect(config,function (err){
    if(err) throw err;
    console.log("DATABASE CONNECTED");
});

app.get("/getUsersList",async function (req,res) {
    let request =db.request();

    const result = await request.query("select * from User_Profile");
    res.json({msg:"Fetch Users Successfully",data:result.recordset});
});
