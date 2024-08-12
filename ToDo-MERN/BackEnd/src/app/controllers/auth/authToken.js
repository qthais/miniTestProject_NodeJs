const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const jwtSecret = '2d2b25db4531f55ca2e7fb01dbfec1d7fefce889e33ec2377d9de196fbc33093db3c99';// Define your JWT secret

exports.register = async (req, res, next) => {
    const { username, password } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
        });

        const maxAge = 3 * 60 * 60; // 3 hours in seconds
        const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            { expiresIn: maxAge }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure:true
        });

        res.status(200).json({
            message: "User successfully created",
            user: user._id,
        });

    } catch (err) {
        res.status(400).json({
            message: "User not successfully created",
            error: err.message,
        });
    }
};
exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        });
    }
    try {
        const user = await User.findOne({ username })
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
                { id: user._id, username, role: user.role },
                jwtSecret,
                {
                    expiresIn: maxAge, // 3hrs in sec
                }
            );
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000, // 3hrs in ms
                secure:true
            });
            res.cookie("userId", user._id.toString(), { httpOnly: false, maxAge:maxAge*1000 });
            res.status(200).json({
                message: "Login successful",
                user,
            });
        } else {
            res.status(400).json({
                message: "Login not successful",
                user: user._id
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}
exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "admin") {
                    return res.status(401).json({ message: "You must be admin" })
                } else {
                    req.user = {
                        id: decodedToken.id,
                        username: decodedToken.username,
                        role: decodedToken.role,
                    };
                    next()
                }
            }

        })
    } else {
        return res
            .status(401)
            .json({ message: "Login again!!" })
    }
}
exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "Basic") {
                    return res.status(401).json({ message: "Just user can do this" })
                } else {
                    req.user = {
                        id: decodedToken.id,
                        username: decodedToken.username,
                        role: decodedToken.role,
                    };
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}
exports.update = async (req, res, next) => {
    const { id } = req.params;
    const { role } = req.body;

    // Check if role and id are provided
    if (!role || !id) {
        return res.status(400).json({ message: "Role and ID are required" });
    }

    // Check if the role is "admin"
    if (role !== "admin") {
        return res.status(400).json({ message: "Role must be 'admin'" });
    }

    try {
        // Find the user and update their information
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is already an admin
        if (user.role === "admin") {
            return res.status(400).json({ message: "User is already an Admin" });
        }

        // Update the user's role and save
        user.role = role;
        await user.save();

        res.status(200).json({ message: "Update successful", user });
    } catch (err) {
        res.status(400).json({ message: "An error occurred", error: err.message });
    }
};

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id
    try {
        // Find and delete the user by ID
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User successfully deleted", user });
    } catch (err) {
        res.status(400).json({ message: "An error occurred", error: err.message });
    }
}
exports.show = async (req, res, next) => {
    try {
        let users = await User.find()
        users = users.map((user) => {
            const container = {}
            container.name = user.username,
                container.role = user.role
            return container
        })
        res.json(users)
    }
    catch (err) {
        next(err)
    }
}
exports.find = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id)
        user = {
            username: user.username,
            role: user.role
        }
        res.json(user)
    } catch (err) {
        next(err)
    }
}