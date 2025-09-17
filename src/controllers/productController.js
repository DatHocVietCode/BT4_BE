const { createProductService, getProductByIdService, getProductPerPageService, filterProductsService,
    getFilteredProductsService, paginateProducts, 
    increaseProductView
} = require("../services/productService");

class ProductController {
    static async createProduct(req, res) {
        const productData = req.body;
        const result = await createProductService(productData);
        if (result.success) {
            return res.status(201).json(result);
        } else {
            return res.status(500).json(result);
        }
    }

    static async getProductById(req, res) {
        const { id } = req.params;
        const result = await getProductByIdService(id);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    }
    static async getProductsPerPage(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        try {
            // 1. Filter sản phẩm theo DTO từ query
            const filteredProducts = await getFilteredProductsService(req.query);

            // 2. Phân trang
            const result = paginateProducts(filteredProducts, page, limit);

            return res.status(200).json(result);
        } catch (error) {
            console.error("Error in getProductsPerPage:", error);
            return res.status(500).json({ success: false, message: "Error fetching products" });
        }
    }
    static async increaseView(req, res) {
    try {
        const product = await increaseProductView(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    };
    
}
module.exports = ProductController;