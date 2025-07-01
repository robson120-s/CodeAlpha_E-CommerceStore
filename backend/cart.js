const exp= require('express');
const router =exp.Router();
const db = require('../backend/db');
const verifyToken = require('../middleware/verifytoken');

router.get('/', verifyToken, (req,res) => {
    const userId = req.user.id;
    const sql = 'SELECT c.id, p.name , p.price, c.quality FROM cart JOIN products p ON c.product_id = p.id WHERE c.user_id = ?';

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({message: 'DB error'});
        res.json(results);
    })
});

        //ADD to CART

router.post('/add', verifyToken, (req,res) => {
    const userId = req.user.id;
    const { product_id,quality} = req.body;

    const sql = 'INSERT INTO cart (user_id, product_id,quantity) VALUES (?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + ?';
    db.query(sql, [userId,product_id, quantity],(err,result) =>{
        if(err) return res.status(500).json({ message: 'Failed to add to cart'})
            res.json({message: 'Item added to cart'})
    }) 
})

        //REMOVE FROM CART
        
router.post('./remove', verifyToken, (req,res) => {
    const userId = req.user.id;
    const {product_id} = req.body;

    const sql = "DELETE FROM cart WHERE user_id=? AND product_id = ?";
    db.query(sql, [userId, product_id], (err, result) => {
        if(err) return res.status(500).json({message:'FAILED to remove item'})
        res.json({message: 'Item Removed'});
    })
})

module.exports = router;

