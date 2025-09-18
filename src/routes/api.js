const express = require('express');
const { createUser, handleLogin, getUser,
    getAccount, addViewedProductController, toggleFav }
    = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const { createProduct, getProductById, getProductsPerPage, increaseView, related } = require("../controllers/productController");
const commentController = require("../controllers/commentController");
const router = express.Router();

// GET /comments/stats/:productId
router.get("/comments/stats/:productId", commentController.getCommentStats);

// GET /comments/:productId
router.get("/comments/:productId", commentController.getComments);

router.post("/create-products", createProduct);
router.get("/products/:id", getProductById);
router.get("/products", getProductsPerPage);
router.patch("/products/:id/increase-view", increaseView); // tăng view cho product
router.get("/products/:id/related", related);

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
router.patch("/users/viewed/:productId", addViewedProductController);
router.post("/users/fav/:id", toggleFav);
module.exports = router;