import dotenv from "dotenv" // package จัดการ env
import app from "./app.js"

dotenv.config()
//ประกาศเรียก config ใน env

const PORT = process.env.PORT || 8000

app.listen(PORT , ()=> console.log(`server running http://localhost:${PORT}`))