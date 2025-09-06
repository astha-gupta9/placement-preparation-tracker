const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        trim: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: [true, "Please add difficulty"]
    },
    tags: { 
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Solved"],
        default: "Not Started"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    solutionLink: {
        type: String
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);