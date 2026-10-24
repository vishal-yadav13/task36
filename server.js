const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;
const SECRET_KEY = "mysecretkey";

let users = [];

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Please enter username and password"
    });
  }

  // Check if user already exists
  const user = users.find((item) => item.username === username);

  if (user) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  // Password ko hash kar rahe hain
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    username: username,
    password: hashedPassword
  });

  console.log("New user:", username);

  res.json({
    message: "Registration successful"
  });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((item) => item.username === username);

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  // Entered password ko saved hashed password se check karna
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  // Login successful hone par JWT token banta hai
  const token = jwt.sign(
    { username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  console.log("Login:", username);

  res.json({
    message: "Login successful",
    token: token
  });
});

// JWT check karne wala middleware
function checkToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token is required"
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token"
      });
    }

    req.user = user;
    next();
  });
}

// Protected route
app.get("/protected", checkToken, (req, res) => {
  res.json({
    message: "Welcome to protected route",
    user: req.user
  });
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});