import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, "super_secret_key", (err, decoded) => {
         console.log(decoded);
    if (err) return res.status(401).send('Invalid Token');

    if (!decoded.id || !decoded.role)
      return res.status(401).send('Invalid Token Data');

    req.user = decoded; // id + role
    next();
  });
};

export default verifyToken;