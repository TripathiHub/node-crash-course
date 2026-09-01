const User = require("../models/user");
async function signup(req, res) {
    try {
        const user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
   
}
module.exports = {
    signup,
}