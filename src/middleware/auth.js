require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const white_lists = ["/", "/register", "/login", "/products"];

    // req.path đã bỏ query string, chỉ còn pathname
    const path = req.path.replace(/\/+$/, ""); // bỏ trailing slash

    console.log(">>> Check auth for path:", path);
    if (white_lists.includes(path)) {
        return next();
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token malformed" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user0 = { email: decoded.email, name: decoded.name };
        console.log(">>> check token", decoded);
        next();
    } catch (err) {
        console.log(">>> Error verify token:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;