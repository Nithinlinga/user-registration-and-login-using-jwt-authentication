const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addQuestion, getAllQuestions, getQuestionById, deleteQuestion } = require("../controllers/questionController");

// Route to add a question (Protected)
router.post("/add", protect, addQuestion);

// Route to get all questions
router.get("/", getAllQuestions);

// Route to get a single question by ID
router.get("/:id", getQuestionById);

// Route to delete a question (Protected)
router.delete("/:id", protect, deleteQuestion);

module.exports = router;
