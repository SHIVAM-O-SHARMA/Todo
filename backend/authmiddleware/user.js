const jwt= require('jsonwebtoken');
const JwtPass= process.env.JWT_USER_PASS;

function authMiddleware(req,res,next){
    const authHeader= req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({msg:'Token missing or malformed'});
    }

// The authHeader is expected in the format: "Bearer <token>"
// We split it by space and take the second part to get the actual token
    const token = authHeader.split(' ')[1];

    try {
    const decoded = jwt.verify(token, JwtPass);
    req.user = decoded;                     // Attach the decoded token payload to the request
    next();                                // Pass control to the next middleware or route
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token', error: error.message });
    }
}

module.exports= {authMiddleware}