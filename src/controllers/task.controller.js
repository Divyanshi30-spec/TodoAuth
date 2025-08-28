import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description });
    res.status(201).json(" created successfully");
  } catch (error) {
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
    res.status(400).json({  error: error.message  });
  }
};


export const editTask=async (req,res)=>{
    try{
        const task= await Task.findByIdAndUpdate(req.params.id , req.body , {news:true})
        if(!task)
            return res.status(404).json({message: "Task not found"})
        res.json(task)
      
    }catch(error){
        res.status(404).json("updated successfully")
    }
}




export const deleteTask= async(req,res)=>{
    try{
        const task= await Task.findByIdAndDelete(req.params.id)
        return res.status(201).json(" created successfully")
    }catch(error){
        res.status(404).json("deleted successfully")
    }
}
