import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
//   const token = req.header("Bearer Token")?.split("")[1]; //bearer token
const authHeader= req.header("Authorization");
if(!authHeader){
    return res.status(401).json({message: "No token, authorization failed"})
}  
const token = authHeader.split(" ")[1];

if (!token){
    return res.status(401).json({ message: "NO token, authorization denied" });
}
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //attach user payload
    next();
  } catch (error) {
    res.status(401).json({ message: "invalid token" });
  }
};

export default auth;
