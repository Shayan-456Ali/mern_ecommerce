import express from "express"
import  {SignUpUser, LoginUser}  from "../controllers/authController.js"

const router = express.Router();
router.post("/signUp", SignUpUser)
router.post("/login", LoginUser)


export default router;