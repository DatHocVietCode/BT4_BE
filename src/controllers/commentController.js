const commentService = require("../services/commentService");

// Thống kê comment
const getCommentStats = async (req, res) => {
  try {
    const { productId } = req.params;

    const totalComments = await commentService.countCommentsByProduct(productId);
    const totalUsersCommented = await commentService.countUniqueUsersByProduct(productId);

    res.json({ productId, totalComments, totalUsersCommented });
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment stats", error });
  }
};

// Lấy toàn bộ comment theo product
const getComments = async (req, res) => {
  try {
    const { productId } = req.params;

    const comments = await commentService.getCommentsByProduct(productId);

    res.json({ productId, comments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

module.exports = { getCommentStats, getComments };
