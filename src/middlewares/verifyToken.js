import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("No token provided");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "test", (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");

    req.myToken = decoded;
    next();
  });
};

export default verifyToken;
