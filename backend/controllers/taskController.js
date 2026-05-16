const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.update(req.body);

    res.status(200).json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.destroy();

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};