import express from "express"
import {Router} from "express"
import {signup, login} from "../controllers/auth.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router=Router()

router.post("/signup", signup)
router.post("/login", login)

export default router;
