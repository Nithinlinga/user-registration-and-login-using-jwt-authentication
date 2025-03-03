const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questionRoutes");

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON request body

// Enable CORS for any domain
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: "BackendDb" })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
// Main Route
app.get("/", (req, res) => {
    res.send("Welcome to the User Authentication System. Use /api/auth/register to register, /api/auth/login to login, and /api/auth/reset-password to reset password. CORS enabled for all domains!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
