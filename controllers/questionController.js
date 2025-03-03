const Question = require("../models/Questions");

// @desc   Add a new question (Only for logged-in users)
// @route  POST /api/questions/add
const addQuestion = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: Login required" });
      }
  
      const data = req.body;
  
      // Check if input is an array or single object
      if (Array.isArray(data)) {
        // Validate each question in the array
        for (const question of data) {
          if (!question.questionText || !question.options || !question.correctAnswer || !question.timeLimit) {
            return res.status(400).json({ message: "All fields are required for each question" });
          }
        }
  
        // Insert all questions into the database
        const newQuestions = await Question.insertMany(data);
        return res.status(201).json({ message: "Questions added successfully", questions: newQuestions });
      }
  
      // Handle a single question
      const { questionText, options, correctAnswer, timeLimit } = data;
  
      if (!questionText || !options || !correctAnswer || !timeLimit) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newQuestion = new Question({ questionText, options, correctAnswer, timeLimit });
      await newQuestion.save();
  
      res.status(201).json({ message: "Question added successfully", question: newQuestion });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


// @desc   Get all questions
// @route  GET /api/questions/
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc   Get question by ID
// @route  GET /api/questions/:id
const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
    res.status(200).json(question);
} catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete a question
// @route  DELETE /api/questions/:id
const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { addQuestion, getAllQuestions, getQuestionById, deleteQuestion };