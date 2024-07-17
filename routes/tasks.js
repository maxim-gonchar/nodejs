const express = require("express");
const router = express.Router();
const {
  updateTask,
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/task.controllers");
const authMiddleware = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/task",
  [
    authMiddleware,
    check("name", "Task name can not be empty").notEmpty(),
    check("description", "Description must be at lease 10 symbols").isLength({
      min: 4,
      max: undefined,
    }),
    check("status", "Status can not be empty").notEmpty(),
  ],
  createTask
);

router.put("/task/:id", authMiddleware, updateTask);

router.delete("/task/:id", authMiddleware, deleteTask);

router.get("/task", authMiddleware, getTasks);

module.exports = router;
