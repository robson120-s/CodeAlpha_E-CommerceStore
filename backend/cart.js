const exp = require('express');
const router = exp.Router();
const db = require('../backend/db');
const verifyToken = require('../middleware/verifytoken');

// GET Cart Items
router.get('/', verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = `
    SELECT c.id, p.name, p.price, c.quantity
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(results);
  });
});

// ADD to Cart
router.post('/add', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + ?
  `;
  db.query(sql, [userId, product_id, quantity, quantity], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to add to cart' });
    res.json({ message: 'Item added to cart' });
  });
});

// REMOVE from Cart
router.post('/remove', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.body;

  const sql = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';
  db.query(sql, [userId, product_id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to remove item' });
    res.json({ message: 'Item removed from cart' });
  });
});

module.exports = router;