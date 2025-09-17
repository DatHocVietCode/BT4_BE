const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password:String,
        role: String,
        favProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        viewedProduct: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;