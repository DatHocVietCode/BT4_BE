const dotenv = require('dotenv');
const Product = require('../models/product.js');
const ProductSearchUtils = require('../utils/search.utils.js');
const { search } = ProductSearchUtils;
dotenv.config();

const createProductService = async (productData) => {
    try {
        let result;
        // Nếu productData là mảng -> insertMany
        if (Array.isArray(productData)) {
            const newProducts = await Product.insertMany(productData);
            result = { success: true, message: "Products created successfully", products: newProducts };
        } else {
            // Nếu là object -> create 1 product
            const newProduct = new Product(productData);
            await newProduct.save();
            result = { success: true, message: "Product created successfully", product: newProduct };
        }

        return result;
    } catch (error) {
        console.error("Error creating product(s):", error);
        return { success: false, message: "Error creating product(s)" };
    }
};


const getProductByIdService = async (productId) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return { success: false, message: "Product not found" };
        }
        return { success: true, product };
    } catch (error) {
        console.error("Error fetching product:", error);
        return { success: false, message: "Error fetching product" };
    }
};

// const getProductPerPageService = async (page = 1, limit = 5) => {
//     try {
//         const skip = (page - 1) * limit;
//         const products = await Product.find().skip(skip).limit(limit).lean();
//         const totalProducts = await Product.countDocuments();
//         return {
//             success: true,
//             data: products,
//             pagination: {
//                 currentPage: page,
//                 totalPages: Math.ceil(totalProducts / limit),
//                 totalProducts
//             }
//         };
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         return { success: false, message: "Error fetching products" };
//     }
// };

// const filterProductsService = async (products, dto) => {
//     try {
//         const filteredProducts = search(products, dto);
//         return { success: true, data: filteredProducts };
//     } catch (error) {
//         console.error("Error filtering products:", error);
//         return { success: false, message: "Error filtering products" };
//     }
// }


const getFilteredProductsService = async (dto) => {
    try {
        // 1. Lấy tất cả sản phẩm
        const allProducts = await Product.find().lean();

        // 2. Fuzzy search + filter
        const filteredProducts = ProductSearchUtils.search(allProducts, dto);

        return filteredProducts;
    } catch (error) {
        console.error("Error filtering products:", error);
        return [];
    }
};

const paginateProducts = (products, page = 1, limit = 5) => {
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const start = (page - 1) * limit;
    const paginatedProducts = products.slice(start, start + limit);

    return {
        success: true,
        data: paginatedProducts,
        pagination: {
            currentPage: page,
            totalPages,
            totalProducts
        }
    };
};

const increaseProductView = async (productId) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    { $inc: { views: 1 } },
    { new: true } // trả về document đã update
  );
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};
const getRelatedProducts = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // Lấy sản phẩm khác cùng category
  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id } // loại trừ chính nó
  }).limit(10); // giới hạn số lượng

  return related;
};

module.exports = {
    createProductService,
    getProductByIdService,
    // getProductPerPageService,
    // filterProductsService
    getFilteredProductsService,
    paginateProducts,
    increaseProductView,
    getRelatedProducts
};
