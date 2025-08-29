import express from "express"
import {Router} from "express"
import {signup, login} from "../controllers/auth.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router=Router()

router.post("/signup", signup)
router.post("/login", login)

export default router;


// export const createTask = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     const newTask = await Task.create({
//       title,
//       description,
//       user: req.user.id   // 👈 FIX: add logged in user
//     });

//     res.status(201).json(newTask);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };













