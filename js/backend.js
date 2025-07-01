
    const exp = require('express');
    const bcrypt = require('bcrypt');
    const jwt= require('jsonwebtoken');
    const db = require('../backend/db');
    //API / End Point


    // app.get("/", (req, res)=>{
    //     res.send("Listening.....");
    // });

    const router = exp.Router();
    const secret = 'your_jwt_secret';

    
    // const router = require('./products');
    

    //Adding user  (SIGN UP)
    router.post("/addUser",async(req,res) => {
        let name = req.body.name;
        let email= req.body.email;
        let pass = req.body.passwrd;


        
        if(!name||!email|| !pass)
            return res.status(400).json({message: 'All Field Required'});


        const hash_pass =await bcrypt.hash(pass,10);

        let sql= "INSERT INTO users (full_name, email, password_hash) VALUES (?,?,?)";

        conn.query(sql, [name, email, hash_pass], (err, result) => {
            if (err) {
            if (err.code === 'ER_DUP_ENTRY'){
                return res.status(400).send("Email already exists.");
            }
            return res.status(500).send("Registration Failed");
        }
            else{                
                res.json({message: 'User Registred Successfully'});
            }
        });

    });

    //LOGIN 
    router.post('/login', (req, res) => {
        const {email, passwrd} = req.body;
        const sql =' SELECT * FROM users WHERE email = ?';

        db.query(sql, [email], (err, results) => {
            if (err) return res.status(500).json({ message :'user not found'});

            const user = results[0];
            const isMatch = bycript.compareSync(passwrd, user.hash_pass);
            if (!isMatch)
                return res.status(401).json({message: 'Incorrect PassWord'});

            const token = jwt.sign({
                id: user.id,
                name: user.full_name
            }, secret, {expiresIn: '1h'});
            res.json({message: 'Login Successful', token});
        })

    })

    module.exports = router;



    // //viewuser
    // app.get("/viewusers", (res,req) => {
    //     let sql = "SELECT * FROM users";

    //     conn.query(sql, (err,result,field) => {
    //         if(err) throw err;
    //         else{
    //             res.send(result);
    //         }
    //     })
    // })

    //Sending Query
    
    
  