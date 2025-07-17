import express from "express"
import * as postController from "../controllers/post.controller.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";

const postRoute = express.Router()

/////// จะเอาตัวเช็ค authenticate ไว้ตรงนี้ก้ได้ แต่ทั้งเส้นนี้ต้อง authen หมด เลยเอาไว้ที่ app จะดีกว่า

postRoute.get("/" ,postController.getAllPost)
postRoute.post("/" ,uploadMiddleware.single('image') ,postController.createPost) //multer มีรับได้หลายอย่าง single ,array field ผ่านชื่อว่า image
postRoute.put("/:id",uploadMiddleware.single('image') ,postController.updatePost)
postRoute.delete("/:id" ,postController.deletePost)


export default postRoute