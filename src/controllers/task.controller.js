import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // 1. Create task and associate with user 
    const task = await Task.create({
      title,
      description,
      user: req.user.id, // user ID from JWT middleware
    });
    console.log("Task created:", task);

    // 2. Push the task ID into the user's tasks array
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { tasks: task._id } },
      { new: true } // return updated user
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // 3. Send response
    res.status(201).json({
      message: "Task created successfully",
      task,
      user: updatedUser, // optional: you can remove this if you only want task
    });

  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ error: "Server error while creating task" });
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
