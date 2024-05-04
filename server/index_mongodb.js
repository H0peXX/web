const express = require("express")
const cors = require("cors")
const mysql = require('mysql');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project 251"
})

app.listen(3001, () => {
    console.log("server is fine")
})

app.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, username: req.session.username })
    } else {
        return res.json({ valid: false })
    }
})

//Login
app.post('/login', (req, res) => {
    console.log(req);
    const sql = `
        SELECT u.*, r.role 
        FROM user_info u 
        JOIN roles r ON u.username = r.username 
        WHERE u.username = ? `;
    db.query(sql, [req.body.username], (err, result) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ message: "Error" });
        }
        if (result.length > 0) {
            const hashedPassword = result[0].password;
            bcrypt.compare(req.body.password, hashedPassword, (err, response) => {
                if (err) {
                    console.error("Error:", err);
                    return res.status(500).json({ message: "Error" });
                }
                if (response) {
                    req.session.username = result[0].username;
                    console.log(req.session.username);
                    if (result[0].role === 'user') {
                        // Redirect user to home page
                        return res.json("user");
                    } else if (result[0].role === 'admin') {
                        // Redirect admin to admin page
                        return res.json("admin");
                    }
                } else {
                    console.log("Invalid username or password");
                    return res.status(401).json({ message: "Invalid username or password" });
                }
            });
        } else {
            return res.json("Fail");
        }
    });
});



//Register
app.post('/register', async (req, res) => {
    const { address, username, email, firstname, lastname, phone } = req.body;
    const password = req.body.password;
    const hashPassword = bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
            console.log(err);
        }
    })

    try {
        // Insert user info
        await new Promise((resolve, reject) => {
            const sql2 = "INSERT INTO user_info (address, username, password, mail, firstname, lastname, phone) VALUES (?, ?, ?, ?, ?, ?, ?)";
            db.query(sql2, [address, username, hashPassword, email, firstname, lastname, phone], (err, result) => {
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


