const jwt = require("jsonwebtoken");

exports.tokenDecodeMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded token data in `req.user`
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
