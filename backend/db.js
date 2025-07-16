    const mysql = require("mysql2");
//Connector    
    const conn =mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "thrift_store",
    })

    //Error Handling
    conn.connect((err)=>{
        if (err) console.log(err);
        else console.log("Connected to MYSQL");

    })
    module.exports = conn;
    