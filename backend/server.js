const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const problemRoutes = require("./routes/problemRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/problems", problemRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err.message));

app.get("/", (req, res) => {
    res.json("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));