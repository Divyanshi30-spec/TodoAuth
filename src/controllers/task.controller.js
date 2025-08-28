import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    // 1. create task
    const task = await Task.create({ title, description, user: req.user.id });
    console.log("Task created:" , task);

    // find the current user
    const user = await User.findById(req.user.id );
    console.log("User ID from DB:", user._id);

       // 3. push the task._id into user's tasks array
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { tasks: task._id } },
      { new: true }
    );

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(400).json(" Page not found");
  }
};

export const getAllTask = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(201).json({
      message: "task created successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      news: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(404).json("updated successfully");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    return res.status(201).json(" created successfully");
  } catch (error) {
    res.status(404).json("deleted successfully");
  }
};
