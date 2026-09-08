const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exits", success: false })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            password: hashPassword,
            email
        });
        res.status(201).json({
            message: "Signup successfully",
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.log(err);
    }

}
async function login(req, res) {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "Authentication failed email or password is wrong",
                success: false
            })
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403).json({
                message: "Authentication failed email or password is wrong",
                success: false
            });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.SECRET_KEY,
            {expiresIn: "24h"}
        )
       res.status(200).json({
        message : "Login success",
        success : true,
        jwtToken,
        email,
        name : user.name
       })
    } catch(err) {
         res.status(500).json({
            message : "Internal server error",
            success : false
         })
    }

}
module.exports = {
    signup,
    login
}