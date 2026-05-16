const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },

  priority: {
    type: DataTypes.STRING,
    defaultValue: "medium",
  },
});

module.exports = Task;