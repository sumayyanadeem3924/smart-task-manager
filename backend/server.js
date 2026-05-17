require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");

const User = require("./models/User");
const Task = require("./models/Task");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Smart Task Manager API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Database Connection
sequelize.sync()
  .then(() => {
    console.log("Database Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Error:", err);
  });

module.exports = app;