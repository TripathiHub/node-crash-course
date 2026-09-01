const joi = require("joi");
function signupValidation(req, res, next) {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required().unique(),
        pasword: joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        res.status(400).send("Bad request");
    }
    next();
}
function loginValidation(req, res, next) {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required().unique(),
        pasword: joi.string().min(4).max(100).required()
    })
     const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        res.status(400).send("Bad request");
    }
    next();
}
module.exports = {
    signupValidation,
    loginValidation
}