const { createUserService, loginService, getUserByEmailService, addViewedProduct ,toggleFavProduct } = require('../services/userService'); 

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
            const { email } = req.body;
              const { id: productId } = req.params; // lấy productId từ URL

            const { user, action } = await toggleFavProduct(email, productId);

            res.json({
            success: true,
            action,   // "added" hoặc "removed"
            favProduct: user.favProduct
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
        };

// Get user by email
const getUserByEmailController = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmailService(email)
    console.log("Controller receive:", user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.error("Error in getUserByEmail:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { 
    createUser, 
    handleLogin, 
    getUser, 
    getAccount ,
    addViewedProductController, 
    toggleFav,
    getUserByEmailController
};