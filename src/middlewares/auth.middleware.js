const jwt = require("jsonwebtoken");
const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;

const authMiddleWare = (req, res, next) => {
  console.log("Ruta:", req.path);
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Forbbiden - no token provided" });
  }

  try {
    const verified = jwt.verify(token, AUTH_SECRET_KEY);
    console.log(verified);

    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "UnAuthorized - invalid token provided" });
  }
};

module.exports = authMiddleWare;
