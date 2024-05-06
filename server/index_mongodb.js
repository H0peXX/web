const express = require("express")
const cors = require("cors")
const mysql = require('mysql');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
 
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));


app.use(cookieParser());
app.use(bodyParser.json());



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project 251"
})

app.listen(3001, () => {
    console.log("server is fine")
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token; // Access cookies using req.cookies
    if (!token) {
        return res.json({ message: "You need to login." });
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if (err) {
                console.log("not Pass")
                return res.json({ message: "Authentication Error" });
            } else {
                console.log("Pass")
                req.name = decoded.name;
                next();
            }
        });
    }
};

app.get('/',verifyUser, (req, res) => {
    return res.json({status: "Success", name: req.name})
})

//Login
app.post('/login', (req, res) => {
    console.log(req);
    const sql = `
        SELECT *
        FROM user_info
        WHERE username = ? `;
    db.query(sql, [req.body.username], (err, result) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ message: "Error" });
        }
        if (result.length > 0) {
            const name = result[0].username;
            const token = jwt.sign({name}, "our-jsonwebtoken-secret-key",{expiresIn:'30d'});
            res.cookie('token',token);
            const hashedPassword = result[0].password;
            bcrypt.compare(req.body.password, hashedPassword, (err, response) => {
                if (err) {
                    console.error("Error:", err);
                    return res.status(500).json({ message: "Error" });
                }
                if (response) {
                    res.username = result[0].username;
                    console.log(res.username);
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


// Register
app.post('/register', async (req, res) => {
    const { address, username, email, firstname, lastname, phone, password } = req.body;
    
    try {
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10); // Using 10 rounds of salt
        
        // Insert user info
        await new Promise((resolve, reject) => {
            const sql2 = "INSERT INTO user_info (address, username, password, mail, firstname, lastname, phone,role) VALUES (?, ?, ?, ?, ?, ?, ?, 'user')";
            db.query(sql2, [address, username, hashPassword, email, firstname, lastname, phone], (err, result) => {
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
        console.error('Error registering user:', error);
        return res.status(500).json({ message: "Error registering user" });
    }
});



// Review
app.post('/review', async (req, res) => {
    const { rating, review } = req.body;

    try {
        // Insert review data into the database
        const sql = "INSERT INTO reviews (rating, review) VALUES (?, ?)";
        db.query(sql, [rating, review], (err, result) => {
            if (err) {
                console.error('Error saving review:', err);
                return res.json('Fail');
            } else {
                console.log('Review saved successfully');
                return res.json('ReviewSuccess');
            }
        });
    } catch (error) {
        console.error('Error saving review:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



// User_Table
app.get('/user_table', (req, res) => {
    // Query to fetch user_info data from the database
    const sql = "SELECT id, address, username, mail, firstname, lastname, phone, role FROM user_info";

    // Execute the query
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching user_info data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // Send the fetched user_info data to the client
            res.json(result);
        }
    });
});

// Review_table
app.get('/review_table', (req, res) => {
    // Query to fetch user_info data from the database
    const sql = "SELECT * FROM reviews";

    // Execute the query
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching user_info data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // Send the fetched user_info data to the client
            res.json(result);
        }
    });
});

// Transaction_table
app.get('/transaction_table', (req, res) => {
    // Query to fetch user_info data from the database
    const sql = "SELECT * FROM transaction";

    // Execute the query
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching user_info data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // Send the fetched user_info data to the client
            res.json(result);
        }
    });
});



// Logout endpoint
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});

});

