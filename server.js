const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON request body

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: "BackendDb" })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Use authentication routes
app.use("/api/auth", require("./routes/auth"));

// Main Route
app.get("/", (req, res) => {
    res.send("Welcome to the User Authentication System. Use /api/auth/register to register, /api/auth/login to login, and /api/auth/reset-password to reset password.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
