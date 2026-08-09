const User = require("../models/user");
async function handleCreteUser(req, res) {
  const body = req.body;
  try {
    const entry = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    console.log("New user created");
    return res.status(201).json(entry);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}
module.exports = {
  handleCreteUser,
};
