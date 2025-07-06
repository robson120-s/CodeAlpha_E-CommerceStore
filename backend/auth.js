const exp = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../backend/db');

const router = exp.Router();
const secret = 'your_jwt_secret'; // Use .env for production

const app = exp();
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));


// Register Route
router.post('/signin', (req, res) => {
    
    
    // let name = req.body.name;
    //     let email= req.body.email;
    //     let password = req.body.passwrd;
    console.log("BODY RECEIVED:", req.body);


  const { name, email, password } = req.body;

  if (!name || !email || !password){
    return res.status(400).json({ message: 'All fields required' });}

  const hash = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hash], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Database error' });
    }
    const token = jwt.sign({ name, email }, secret, { expiresIn: '1h' });
    res.json({ message: 'User registered successfully', token });    
    window.location.href = 'shop.html';
  });
});

// Login Route
router.post('/login', (req, res) => {

    console.log('Login request:', req.body);

  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];

    const isMatch = bcrypt.compareSync(password, user.password_hash);

    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, name: user.full_name }, secret, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
    res.json({message: 'Login Successfull', token , name : user.full_name})
  });
});

module.exports = router;
