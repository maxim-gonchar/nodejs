const Task = require("../models/Task");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }
    const { name, description, status } = req.body;
    const isExist = await Task.findOne({ name });
    if (isExist) {
      return res.status(400).json({ message: "Task already exist" });
    }
    const task = new Task({
      name: name,
      description: description,
      status: status,
    });
    await task.save();
    return res.json({ message: "Task has been created" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    await Task.findByIdAndUpdate(req.params.id, {
      name,
      description,
      status,
    });
    res.json({ message: "Task has been updated" });
  } catch (error) {
    res.status(400).json({ message: "Failed to updated the task" });
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      return res.json([]);
    }
    return res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Tasks not found" });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const tasks = await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task has been deleted" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.createTask = createTask;
exports.getTasks = getTasks;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
