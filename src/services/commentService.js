const Comment = require("../models/comment")
// Đếm số comment của 1 product
const countCommentsByProduct = async (productId) => {
  return await Comment.countDocuments({ product: productId });
};

// Đếm số user khác nhau đã comment
const countUniqueUsersByProduct = async (productId) => {
  const users = await Comment.find({ product: productId }).distinct("user");
  return users.length;
};

// Lấy danh sách comment theo product
const getCommentsByProduct = async (productId) => {
  return await Comment.find({ product: productId })
    .populate("user", "name email") // lấy thêm thông tin user
    .sort({ createdAt: -1 }); // mới nhất trước
};

module.exports = {
  countCommentsByProduct,
  countUniqueUsersByProduct,
  getCommentsByProduct,
};