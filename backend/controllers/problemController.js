const mongoose = require("mongoose");
const Problem = require("../models/problem");
const ErrorResponse = require("../utils/errorResponse");

// Create problem
const createProblem = async (req, res, next) => {
    try {
        const { title, difficulty, tags, status } = req.body;

        const problem = await Problem.create({
            title,
            difficulty,
            tags,
            status,
            user: req.user._id     // from JWT
        });

        return res.status(201).json({
            success: true,
            message: "Problem created successfully",
            problem
        });
    } catch (err) {
        next(err);
    }
};

// Get all problems of a user
const getProblems = async (req, res, next) => {
    try {
        const { difficulty, status, tags, search, page = 1, limit = 10, sort } = req.query;

        let query = { user: req.user._id };

        // Filter on problems
        if (difficulty) query.difficulty = difficulty;
        if (status) query.status = status;
        if (tags) query.tags = { $in: tags.split(",") };

        // Searching a problem
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        // Pagination
        const pageNumber = Number(page);
        const pageSize = Number(limit);

        // Sorting
        let sortOptions = { createdAt: -1 };
        if (sort) {
            const [field, order] = sort.spilt(":");
            sortOptions = { [field]: order === "asc" ? 1 : -1 };
        }

        const total = await Problem.countDocuments(query);

        const problems = await Problem.find(query)
            .sort(sortOptions)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);
        
        return res.status(200).json({
            success: true,
            count: problems.length,
            total,
            page: pageNumber,
            pages: Math.ceil(total / pageSize),
            problems
        });
    } catch (err) {
        next(err);
    }
};

// Update problem
const updateProblem = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const updated = await Problem.findOneAndUpdate(
            { _id: id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return next(new ErrorResponse("Problem not found", 404));
        }
        
        return res.status(200).json({
            success: true,
            message: "Problem updated",
            problem: updated
        });
    } catch (err) {
        next(err);
    }
};

// Delete problem
const deleteProblem = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const deleted = await Problem.findOneAndDelete({
            _id: id,
            user: req.user._id
        });

        if (!deleted) {
            return next(new ErrorResponse("Problem not found", 404));
        }
        
        return res.status(200).json({ 
            success: true,
            message: "Problem deleted successfully" 
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { createProblem, getProblems, updateProblem, deleteProblem };