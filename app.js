const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/userDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// User Model
const User = mongoose.model("User", {
    username: String,
    password: String,
});

app.use(bodyParser.json());

// User Registration
app.post("/register", async (req, res) => {
    try {
        const existingUser = await User.findOne({
            username: req.body.username,
        });
        if (existingUser) {
            return res.status(400).send("Username already exists");
        }

        // Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// User Login
app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare hashed passwords with bcrypt
        const passwordMatch = await bcrypt.compare(
            req.body.password,
            user.password,
        );
        if (!passwordMatch) {
            return res.status(401).send("Incorrect password");
        }

        // Passwords match, login successful
        res.status(200).send("Login successful");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
