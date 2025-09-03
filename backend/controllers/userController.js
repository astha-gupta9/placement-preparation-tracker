const User = require("../models/user");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json(users);
    } catch (err) {
        return next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }

        return res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new Error("User not found", 404));
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();
        return res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    } catch (err) {
        return next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new Error("User not found", 404));
        }

        await user.deleteOne();
        return res.status(200).json({ message: "User removed" });
    } catch (err) {
        return next(err);
    }
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };