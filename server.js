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
    res.send(`
        <h2>Welcome to the User Authentication System API</h2>
        <p>This is a backend API for authentication and question management.</p>
        <p>Use the following endpoints to interact with the system:</p>
        <ul>
            <li><strong>POST /api/auth/register</strong> - Register a new user</li>
            <li><strong>POST /api/auth/login</strong> - Log in an existing user</li>
            <li><strong>POST /api/auth/reset-password</strong> - Reset user password</li>
            <li><strong>GET /api/questions</strong> - Fetch all questions</li>
            <li><strong>POST /api/questions</strong> - Add a new question</li>
        </ul>
        <p>CORS is enabled for all domains.</p>
        <p>Check the complete source code on <a href="https://github.com/Nithinlinga/user-registration-and-login-using-jwt-authentication.git">GitHub</a>.</p>
    `);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
