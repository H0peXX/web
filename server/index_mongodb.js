const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require("./models/user")
const mysql = require('mysql');



const app = express()
app.use(express.json());
app.use(cors())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project 251"
})

app.listen(3001, () => {
    console.log("server is fine")
})


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `
        SELECT u.*, r.role 
        FROM user_info u 
        JOIN roles r ON u.username = r.username 
        WHERE u.username = ? AND u.password = ?`;
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ message: "Error" });
        }
        if (result.length > 0) {
            const user = result[0];
            if (user.role === 'user') {
                // Redirect user to home page
                return res.json("user");
            } else if (user.role === 'admin') {
                // Redirect admin to admin page
                return res.json("admin");
            }
        } else {
            console.log("Invalid username or password");
            return res.status(401).json({ message: "Invalid username or password" });
        }
    });
});


app.post('/register', async (req, res) => {
    const { address, username, password, email, firstname, lastname, phone } = req.body;

    try {
        // Insert user info
        await new Promise((resolve, reject) => {
            const sql2 = "INSERT INTO user_info (address, username, password, mail, firstname, lastname, phone) VALUES (?, ?, ?, ?, ?, ?, ?)";
            db.query(sql2, [address, username, password, email, firstname, lastname, phone], (err, result) => {
                if (err) {
                    console.error('Error registering user:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        // Insert user role
        await new Promise((resolve, reject) => {
            const sql3 = "INSERT INTO roles (username, role) VALUES (?, 'user')";
            db.query(sql3, [username], (err, result) => {
                if (err) {
                    console.error('Error registering user:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return res.json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error registering user" });
    }
});


