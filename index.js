import express from "express"
import connectDB from "./src/db/db.js"
import dotenv from "dotenv"
import taskRoutes from "./src/routes/user.route.js"
import authRoutes from "./src/routes/auth.routes.js"

dotenv.config()
const app=express()

app.use(express.json())   //middleware

app.use("/api/tasks", taskRoutes)
app.use("/api/auth", authRoutes)

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server is running on ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log("DB connection failed", error);
  });

app.get("/",(req,res)=>{
    res.send("Hello")
})



