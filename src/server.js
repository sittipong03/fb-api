import dotenv from "dotenv" // package จัดการ env
import app from "./app.js"
import shutdown from "./utils/shutdown.util.js"

dotenv.config()
//ประกาศเรียก config ใน env

const PORT = process.env.PORT || 8000

app.listen(PORT , ()=> console.log(`server running http://localhost:${PORT}`))


// จัดการ disconnect prisma แล้วแจ้งออกมา
process.on("SIGINT" , ()=>{shutdown('SIGINT')}) // process.on คิดว่าเหมือนดัก event onClick smt
process.on("SIGTERM" , ()=>{shutdown('SIGTERM')}) // จัดการ docker

process.on("uncaughtException" , ()=>{shutdown('uncaughtException')})
process.on("unhandleRejection" , ()=>{shutdown('unhandleRejection')})