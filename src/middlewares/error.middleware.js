export default function (err, req, res, next) { // signature function // ดัวย fn เดียวกัน input มีหลายค่า ส่งได้หลายแบบเช่น arr obj fn
    console.log(err) // เป็น obj จะเพิ่มอะไรเข้าไปก้ได้ เช่น  err.code 
    err.statusCode = 500
    res.status(err.statusCode).json({ 
        errorName : err.name, 
        errorMsg : err.message })
}