import express from "express"
// import {register , login , getMe} from "../controllers/auth.controller.js" 
import * as authController from '../controllers/auth.controller.js'
import { validate ,registerSchema ,loginSchema } from "../validations/validator.js"
import tryCatch from "../utils/try-catch.util.js"
import authenticate from "../middlewares/authenticate.middleware.js"



const authRoute = express.Router()

authRoute.post("/login" ,validate(loginSchema), tryCatch( authController.login)) // ท่าเก่าเอาทำ fnc trycatch ครอบ
authRoute.post("/register" ,validate(registerSchema) , authController.registerYup)
authRoute.get("/me" ,authenticate, authController.getMe)



export default authRoute