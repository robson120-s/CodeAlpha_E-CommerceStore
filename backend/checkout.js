const express = require('express');
const router = express.Router();
const db = require('../backend/db');
const verifyToken = require('../middleware/verifytoken');

// Place Order
router.post('/', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { fullname, address } = req.body;

  const getCartSql = `SELECT c.product_id, c.quantity, p.price
                      FROM cart c
                      JOIN products p ON c.product_id = p.id
                      WHERE c.user_id = ?`;

  db.query(getCartSql, [userId], (err, cartItems) => {
    if (err) return res.status(500).json({ message: 'Failed to get cart' });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderSql = `INSERT INTO orders (user_id, full_name, address, total, created_at)
                      VALUES (?, ?, ?, ?, NOW())`;

    db.query(orderSql, [userId, fullname, address, total], (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to place order' });

      const orderId = result.insertId;

      // Optional: store order_items table for each product

      const clearCartSql = 'DELETE FROM cart WHERE user_id = ?';
      db.query(clearCartSql, [userId], () => {
        res.json({ message: 'Order placed successfully!' });
      });
    });
  });
});

module.exports = router;
