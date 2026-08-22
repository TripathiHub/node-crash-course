const express = require("express");
const mysql = require("mysql2");
const session = require("express-session");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());

app.use(
    session({
        secret: "student-management-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
);
const db = mysql.createConnection({
    host: "mysql-1ba6d7e-himanshuramtripathi10-c962.j.aivencloud.com",
    user: "avnadmin",
    port: 16294,
    password: "YOUR_PASSWOR",
    database: "defaultdb",
    ssl: {
        ca: fs.readFileSync("./ca.pem")
    }
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }

    console.log("MySQL connected successfully!");
});
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/");
    }

    next();
}

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const query = `
        SELECT * FROM users
        WHERE username = ? AND password = ?
    `;

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                error: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        req.session.user = {
            id: results[0].id,
            username: results[0].username
        };

        res.json({
            message: "Login successful"
        });
    });
});
app.get("/dashboard.html", requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/students", requireLogin, (req, res) => {
    const query = "SELECT * FROM students";

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                error: "Database error"
            });
        }

        res.json(results);
    });
});

app.post("/students", requireLogin, (req, res) => {
    const { roll_no, name, branch, semester, email } = req.body;

    const query = `
        INSERT INTO students (roll_no, name, branch, semester, email)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [roll_no, name, branch, semester, email],
        (err, result) => {
            if (err) {
                console.log(err);

                return res.status(500).json({
                    error: "Failed to add student"
                });
            }

            res.status(201).json({
                message: "Student added successfully",
                studentId: result.insertId
            });
        }
    );
});

app.put("/students/:id", requireLogin, (req, res) => {
    const { id } = req.params;
    const { roll_no, name, branch, semester, email } = req.body;

    const query = `
        UPDATE students
        SET roll_no = ?, name = ?, branch = ?, semester = ?, email = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [roll_no, name, branch, semester, email, id],
        (err, result) => {
            if (err) {
                console.log(err);

                return res.status(500).json({
                    error: "Failed to update student"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Student not found"
                });
            }

            res.json({
                message: "Student updated successfully"
            });
        }
    );
});
app.delete("/students/:id", requireLogin, (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM students WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                error: "Failed to delete student"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    });
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                error: "Logout failed"
            });
        }

        res.json({
            message: "Logged out successfully"
        });
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(express.static("public"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});