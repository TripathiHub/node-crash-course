const jwt = require("jsonwebtoken");
function ensureAuthenticated(req, res, next) {
    const auth = req.headers["authorization"];
    if (!auth) {
        res.status(403).json({ message: "Unauthorizes user", });
    }
        try {
            const decoded = jwt.verify(auth, process.env.SECRET_KEY);
            req.user = decoded;
            next();
        } catch {
           return res.status(401).json({message: "Unauthorizes user jwt token expire"});
        }
}
module.exports = {
    ensureAuthenticated
}