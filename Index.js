const express = require('express');
const app = express();
const PORT = 7000;
let sql;
const sqlite = require("sqlite3").verbose();
const cors = require("cors")

const db = new sqlite.Database("./quote.db",sqlite.OPEN_READWRITE,(err) => {
    if(err){
        console.log(err)
    }else{
        console.log("DB Connected Successfully")
    }
})
app.use(express.json())
app.use(cors());

app.post("/quote", async (req,res) => {
    try {
        
        const {name , email, department, mobile, address} = req.body;
        sql = "INSERT INTO quote(name , department, email, mobile, address) VALUES (?,?,?,?,?)"
        db.run(sql,[name , department, email, mobile, address],(err) => {
            if(err){
                res.json({
                    status : 0,
                    message : "Error",
                    err
                })
                console.log(err)
            }
            return res.json({
                status : 1,
                message : "Success",
            })
        })

    } catch (error) {
        res.json({
            status : 0,
            message : "Server Error"
        })
    }
})


app.post("/quotedata", async (req,res) => {
    try {
        
        sql = "SELECT * FROM quote"

        db.all(sql,{},(err,data) => {
            if(err){
                res.json({
                    status : 0,
                    message : "Error"
                })
                console.log(err)
            }
            if(data.length === null){
                res.json({
                    status : 0,
                    message : "Data not found"
                })
            }else{
                res.json({
                    status : 1,
                    message : "Success",
                    data
                })
            }
        })
    } catch (error) {
        res.json({
            status : 0,
            message : "Error"
        })
        console.log(err)
    }
})

app.listen(PORT,()=>{
    console.log(`Port Running Successfully in ${PORT}`)
})