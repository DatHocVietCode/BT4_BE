const express = require('express');
const { createUser, handleLogin, getUser,
    getAccount }
    = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const { createProduct, getProductById, getProductsPerPage } = require("../controllers/productController");

const router = express.Router();

router.post("/create-products", createProduct);
router.get("/products/:id", getProductById);
router.get("/products", getProductsPerPage);



router.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello wordddddd!"
    });
});

router.post("/register", createUser);
router.post("/login", handleLogin);



router.use(auth);
router.get("/get-user", getUser);
router.get("/account", delay, getAccount);


module.exports = router;