const Problem = require("../models/problem");

// Create problem
const createProblem = async (req, res) => {
    try {
        const { title, difficulty, tags, status, user } = req.body;

        const problem = new Problem({
            title,
            difficulty,
            tags,
            status,
            user
        });

        await problem.save();
        return res.status(201).json({ message: "Problem created successfully", problem });
    } catch (err) {
        return res.status(500).json({ message: "Error creating problem", err: err.message });
    }
};

// Get all problems of a user
const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find({ user: req.user.id });
        res.json(problems);
    } catch (err) {
        res.status(500).json({ message: "Error fetching problems", err });
    }
};

// Update problem
const updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findOneAndUpdate(
            { _id: id, user: req.user.id},
            req.body,
            { new: true }
        );

        if (!problem) return res.status(404).json({ message: "Problem not found" });
        res.json(problem);
    } catch (err) {
        res.status(500).json({ message: "Error updating problem", err });
    }
};

// Delete problem
const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findOneAndDelete({
            _id: id,
            user: req.user.id
        });

        if (!problem) return res.status(404).json({ message: "Problem not found" });
        res.json({ message: "Problem deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting problem", err });
    }
};

module.exports = { createProblem, getProblems, updateProblem, deleteProblem };