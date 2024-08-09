const User = require('../app/models/User')
const bcrypt = require('bcryptjs');
exports.register = async (req, res, next) => {
    const { username, password } = req.body
    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            password: hashedPassword,
        }).then(user =>
            res.status(200).json({
                message: "User successfully created",
                user,
            })
        )
    } catch (err) {
        res.status(401).json({
            message: "User not successful created",
            error: err.mesage,
        })
    }
}
exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        });
    }
    try {
        const user = await User.findOne({ username})
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(200).json({
                message: "Login successful",
                user,
            });
        } else {
            return res.status(400).json({ message: "Login not successful" });
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}
exports.update = async (req, res, next) => {
    const { role, id } = req.body;
    // First - Verifying if role and id is presnt
    if (role && id) {
        // Second - Verifying if the value of role is admin
        if (role === "admin") {
            // Finds the user with the id
            await User.findById(id)
                .then((user) => {
                    // Third - Verifies the user is not an admin
                    if (user.role !== "admin") {
                        user.role = role;
                        user.save((err) => {
                            //Monogodb error checker
                            if (err) {
                                res
                                    .status("400")
                                    .json({ message: "An error occurred", error: err.message });
                                process.exit(1);
                            }
                            res.status("201").json({ message: "Update successful", user });
                        });
                    } else {
                        res.status(400).json({ message: "User is already an Admin" });
                    }
                })
                .catch((error) => {
                    res
                        .status(400)
                        .json({ message: "An error occurred", error: error.message });
                });
        }
    }
}
exports.deleteUser = async (req, res, next) => {
    const { id } = req.body
    await User.findById(id)
        .then(user => user.remove())
        .then(user =>
            res.status(201).json({ message: "User successfully deleted", user })
        )
        .catch(error =>
            res
                .status(400)
                .json({ message: "An error occurred", error: error.message })
        )
}