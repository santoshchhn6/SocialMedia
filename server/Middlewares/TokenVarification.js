import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const tokenVarification = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "unauthorized!" });

  jwt.verify(token, process.env.TOKEN_KEY, async (err, user) => {
    if (err) return res.status(403).json({ message: "token is not valid!" });
    req.user = user;
    next();
  });
};
