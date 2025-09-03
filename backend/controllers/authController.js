const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return next(new ErrorResponse("User already exists", 400));
        }

        const user = await User.create({ name, email, password });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (err) {
        next(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        }

        return next(new ErrorResponse("Invalid email or password", 401));
    } catch (err) {
        next(err);
    }
};

const getProfile = async (req, res) => {
    return res.json(req.user);
}

module.exports = { registerUser, loginUser, getProfile };