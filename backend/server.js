// BACKEND SERVER

const exp = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = exp();
const PORT = 3001;

// ✅ Middleware - always FIRST
app.use(cors());
app.use(exp.json()); // for JSON body parsing
app.use(bodyParser.urlencoded({ extended: true })); // for form data
app.use(exp.urlencoded({ extended: true })); // optional, same as bodyParser

// ✅ Routes
const authRoutes = require('./auth');
app.use('/', authRoutes);

const productroutes = require('../js/products');
app.use('/products', productroutes);

const cartproduct = require('./cart');
app.use('/cart', cartproduct);

const checkoutroutes = require('./checkout');
app.use('/checkout', checkoutroutes);

// ✅ Optional static file serving
app.use(exp.static('CodeAlpha'));

// ✅ Root route (optional but useful)
app.get('/', (req, res) => {
  res.send('API is running');
});

// ✅ Start server
app.listen(PORT, () => console.log(`✅ Listening on port ${PORT}`));


// Route files

// const orderRoutes = require('./routes/orders');

// Routes
// app.use('/', authRoutes);          // /register, /login
// app.use('/cart', cartRoutes);      // /cart, /cart/add, /cart/remove
// app.use('/checkout', checkoutRoutes); // /checkout
// app.use('/orders', orderRoutes);   // /orders




