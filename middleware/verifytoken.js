const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

function verifyToken(req,res, next ){
     console.log("BODY RECEIVED:", req.body);
    const authHeader = req.headers['authorization'];
    if(!authHeader)return res.status(403).json({message:'Token required'});

    const token = authHeader.split(' ')[1];
    if(!token) return res.status(403).json({message: 'Token missing'});

    jwt.verify(token,secret, (err, decoded) => {
        if (err) return res.status(401).json({message: 'Invalid token'});

        req.user = decoded;
        next();
    })
}
module.exports = verifyToken;