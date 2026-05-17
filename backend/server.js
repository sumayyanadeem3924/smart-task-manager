const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const User = require("./models/User");
const Task = require("./models/Task");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Smart Task Manager API Running");
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});;
});
