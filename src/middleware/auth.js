require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const white_lists = [ "/", "register", "/login"];
    if (white_lists.find(item => '/v1/api' + item
        === req.originalUrl
    ))
    {
        next();
    }
    else
    {
        if (req?.headers?.authorization?.split(" ")[1])
        {
            const token = req.headers.authorization.split(" ")[1];

            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user0 = {
                    email: decoded.email,
                    name: decoded.name
                };
                console.log(">>> check token", decoded);
                next();
            }
            catch(error)
            {
                console.log(">>> Error verify token:", error);
                return res.status(401).json(
                    {
                       message: "Died token"
                    }
                );
            }
        }
    }
}


module.exports = auth;