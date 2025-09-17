const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        content: String,
    }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;