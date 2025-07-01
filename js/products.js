const exp = require('express');
const router = exp.Router();
const db =require('../backend/db');

router.get('/', (req, res) => {
    const sql = "SELECT * FROM products" ;
    db.query(sql, (err, results)=> {
        if (err) return res.status(500).json({error: "DB error"});
        res.json(results);
    })
})
module.exports = router;