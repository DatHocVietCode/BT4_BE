require("dotenv").config();
const monngoose = require("mongoose");

const dbState = [
    {
        value: 0,
        label: "Disconnected"
    },
    {
        value: 1,
        label: "Connecting"
    },
    {
        value: 2,
        label: "Disconnecting"
    }
];

const connection = async () => {
    try {
        await monngoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
        monngoose.connection.on("disconnected", () => {
            console.log(`Database disconnected with state: ${dbState[monngoose.connection.readyState].label}`);
        });
        monngoose.connection.on("connected", () => {
            console.log(`Database connected with state: ${dbState[monngoose.connection.readyState].label}`);
        });
    } catch (error) {
        console.log("Database connection failed", error);
    }
};

module.exports = connection;