import express from "express"
import authRoute from "./routes/auth.route.js"
import postRoute from "./routes/post.route.js"
import notFoundMiddleware from "./middlewares/not-found.middleware.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import authenticate from "./middlewares/authenticate.middleware.js"
import cors from "cors"
import multer from "multer" //
const app = express()
app.use(cors({
    origin : 'http://localhost:5173'
}))
app.use(express.json())
// app.use(express.urlencoded()) // เป็นอีกวิธีการส่ง ดูใน postman เป็นการส่ง text เข้ามา คล้ายๆเหมือน express.json แต่อีกวิธี 
// form-data คือส่งรูปได้


app.use("/api/auth", authRoute)
app.use("/api/post", authenticate ,postRoute)
app.use("/api/comment", (req, res) => res.send('comment service'))
app.use("/api/like", (req, res) => res.send('like service'))

app.use(notFoundMiddleware)

// error middleware 4 parameter 
app.use(errorMiddleware)

export default app