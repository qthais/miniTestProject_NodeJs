const express = require("express")
const router = express.Router()
const { register, login, update, deleteUser, adminAuth, userAuth,show,find } = require("../app/controllers/auth/authToken")
router.get('/list',adminAuth,show)
router.get('/find/:id',find)
router.route("/register").post(register)
router.route("/login").post(login);
router.route("/update/:id").put(adminAuth, update)
router.route("/deleteUser/:id").delete(adminAuth, deleteUser)
router.get('/adminAuth', adminAuth, (req, res) => {
    const user = req.user;
    res.json({
        message: "User profile data",
        user,
    });
})
router.get('/userAuth', userAuth, (req, res) => {
    const user = req.user;
    res.json({
        message: "User profile data",
        user,
    });
})
module.exports = router