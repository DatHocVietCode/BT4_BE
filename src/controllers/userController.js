const { createUserService, loginService, getUserService, addViewedProduct ,toggleFavProduct } = require('../services/userService'); require('../services/userService');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await createUserService( name, email, password );
    return res.status(201).json(user);
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data);
}

const getUser = async (req, res) => {
    const user = await getUserService();
    return res.status(200).json(user);
}

const getAccount = async (req, res) => {
    return res.status(200).json(req.user);
}
const addViewedProductController = async (req, res) => {
        try {
            const userEmail = req.user0.email;
            console.log(userEmail)
            const { productId } = req.params;

            const viewedProducts = await addViewedProduct(userEmail, productId);

            res.status(200).json({
                message: "Viewed product updated successfully",
                viewedProducts
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
    const toggleFav = async (req, res) => {
        try {
            const { email } = req.body;       // lấy email từ body request
            const { id: productId } = req.params; // lấy productId từ URL

            const user = await toggleFavProduct(email, productId);
            res.json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

module.exports = { 
    createUser, 
    handleLogin, 
    getUser, 
    getAccount ,
    addViewedProductController, 
    toggleFav
};