const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./quote.db",sqlite.OPEN_READWRITE,(err) => {
    if(err){
        console.log(err)
    }else{
        console.log("DB Connected ")
    }
})

const sql = `CREATE TABLE quote(ID INTEGER PRIMARY KEY, name , department, email, mobile, address)`
db.run(sql);
