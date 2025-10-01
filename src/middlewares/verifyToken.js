import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("No token provided");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid Token");

    if (!decoded.id || !decoded.role) {
      return res.status(401).send("Invalid Token Data");
    }

    req.user = decoded; // id + role
    next();
  });
};

export default verifyToken;