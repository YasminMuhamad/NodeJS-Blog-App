
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Access token required' });
    }

    let token;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    } else {
      token = authHeader;
    }

    if (!token) {

      return res.status(401).json({ message: 'Access token required' });
    }



    if (token === 'undefined' || token === 'null' || token === '') {
      return res.status(401).json({ message: 'Token is empty' });
    }


    try {
      const decodedWithoutVerify = jwt.decode(token);
      
      if (!decodedWithoutVerify) {
        return res.status(403).json({ message: 'Token is malformed' });
      }
    } catch (decodeError) {
    }

    jwt.verify(token, "super_secret_key", (err, user) => {
      if (err) {
        
        return res.status(403).json({ message: 'Invalid token - ' + err.message });
      }

      
      // Check if user.id and user.role exist in the token payload
      if (!user.id || !user.role) {
        return res.status(403).json({ message: 'Invalid token payload' });
      }
      
      // Attach user information to the request object
      req.user = {
        id: user.id,
        userId: user.id, 
        role: user.role
      };
      
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default verifyToken;