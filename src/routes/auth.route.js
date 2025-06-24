import express from "express"
// import {register , login , getMe} from "../controllers/auth.controller.js" 
import * as authController from '../controllers/auth.controller.js'
const authRoute = express.Router()

authRoute.post("/login" , authController.login)
authRoute.post("/register" , authController.register)
authRoute.get("/me" , authController.getMe)



export default authRoute