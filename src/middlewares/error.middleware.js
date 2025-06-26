export default function createError (err, req, res, next) { // signature function // ดัวย fn เดียวกัน input มีหลายค่า ส่งได้หลายแบบเช่น arr obj fn
    console.log(err) // เป็น obj จะเพิ่มอะไรเข้าไปก้ได้ เช่น  err.code 
    const statusCode = err.statusCode  || 500
    console.log(err.message)
    res.status(statusCode).json({ error : err.message})
}

