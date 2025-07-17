import multer from "multer" // lib สำหรับ จัดการไฟล์ที่ส่งเข้ามา pdf รูป
import path from "path"


const dest = path.join(process.cwd() , "temp-pic")
const storage = multer.diskStorage({// config option multer 
    destination :(req , file ,cb)=> cb(null , dest), // null = ถ้าไม่มี error dest คือตำแหน่งที่จะวาง
    filename : (req , file , cb)=>{
        let fileExt = path.extname(file.originalname) //หา ext ไฟล์มาปะ file.originalname คือเอาชื่อไฟล์มา
        let filename = `Pic_${Date.now()}_${Math.round(Math.random()*100)}${fileExt}` //ใช้วัน + random เพื่อให้ไฟล์มันชื่อไม่ซ้ำกัน
        cb(null , filename)
    }

})

export default multer({storage})













//----------------------------------------------------------------

// console.log(process.cwd()) // cwd คือเช็ค directory ปัจจุบัน
// console.log(import.meta.url) // เขาถึงไฟล์ที่รันอยู่ด้วย

// let picPath = process.cwd() + '/' + 'temp-pic'// ไม่แนะนำ ใช้วิธีล่างดีกว่า
// console.log(picPath)

// let picPath2 = path.join(process.cwd(),"temp-pic") // path join จัดการเกี่ยวกับ พาท unix กับ window ไม่เหมือนกัน
// console.log(picPath2)