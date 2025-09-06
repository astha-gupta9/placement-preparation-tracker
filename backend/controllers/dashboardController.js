const mongoose = require("mongoose");
const Problem = require("../models/problem");

const getDashboardStats = async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);

        const byDifficultyRaw = await Problem.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: { difficulty: "$difficulty", status: "$status" },
                    count: { $sum: 1 }
                }
            }
        ]);

        const byDifficulty = {};
        byDifficultyRaw.forEach(item => {
            const { difficulty, status } = item._id;
            if (!byDifficulty[difficulty]) {
                byDifficulty[difficulty] = { "Solved": 0, "In Progress": 0, "Not Started": 0 };
            }
            byDifficulty[difficulty][status] = item.count;
        });

        const byStatusRaw = await Problem.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const byStatus = {};
        byStatusRaw.forEach(item => {
            byStatus[item._id] = item.count;
        });

        const totalSolved = byStatus["Solved"] || 0;
        const totalProblems = Object.values(byStatus).reduce((a, b) => a + b, 0);
        const progressPercent = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

        const recentActivity = await Problem.find({ user: userId })
            .sort({ updatedAt: -1 })
            .limit(5)
            .select("title status updatedAt");

        const solvedProblems = await Problem.find({
            user: userId,
            status: "Solved"
        }).sort({ updatedAt: -1 });

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (const problem of solvedProblems) {
            const solvedDate = new Date(problem.updatedAt);
            solvedDate.setHours(0, 0, 0, 0);

            if (solvedDate.getTime() === currentDate.getTime()) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else if (solvedDate.getTime() < currentDate.getTime()) {
                break;
            }
        }

        return res.status(200).json({
            success: true,
            stats: {
                byDifficulty,
                byStatus,
                totalSolved,
                totalProblems,
                progressPercent,
                recentActivity,
                dailyStreak: streak
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getDashboardStats };