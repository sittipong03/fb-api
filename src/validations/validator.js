import { object, string, number, date, ref } from "yup";
import createError from "../utils/create-error.util.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobileRegex = /^[0-9]{10,15}$/

export const registerSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    identity: string().test( // ที่ใช้ .test ไม่ใช่ . match เพราะ มันเช็ค 2 อันพร้อมกันไม่ได้
        'identity check', // มี 3 parameter ชื่อ , ข้อความ , callback function 
        'Identity must be a valid email or mobile number',
        (value) => { // value คือส่ิงที่ฝังอยู่ ใช้เรียก valuer ที่ส่งมามาเช็คซักอย่างอันนี้เอาไปเช็ค email / mobile กับ Regex
            if (!value) { return true } // ไม่ส่งมามันจะได้ ??????????
            return emailRegex.test(value) || mobileRegex.test(value)
        }
    ),
    password: string().min(4).required(),
    confirmPassword: string().oneOf([ref("password")], "confirmPassword must match Password"),
    email: string().email(),
    // email : string().test("must an email" , value => emailRegex.test(value))
    mobile: string().matches(mobileRegex)
}).noUnknown() // noUnknow หมายความว่าอะไรที่ไม่เกี่ยวข้อง field ไม่ใช้ ไม่อยู่ในการ validate ให้เอาออกไป
    .transform((value) => { // เช็คถ้ามี email หรือ mobile มาจะลบ identity เลย
        if (value.email || value.mobile) {
            delete value.identity
            return value
        }
        const newValue = ({ ...value, [emailRegex.test(value.identity) ? 'email' : 'mobile']: value.identity }) //[] ในชื่อแรกคือ พยายาม เช็ตว่า var[key] ข้างในเป็นอะไร email หรือ mobile แล้วเอาค่าใส่
        delete newValue.identity
        return newValue
    }).test(// เทส ทั้ง schema
        'require-identity-or-mobile-or-email',
        'At least one of identity, email, or mobile must be provided',
        (value) => {
            return Boolean(value.identity || value.email || value.mobile)
        }
    )




export const loginSchema = object({
    identity: string().test( // ที่ใช้ .test ไม่ใช่ . match เพราะ มันเช็ค 2 อันพร้อมกันไม่ได้
        'identity check', // มี 3 parameter ชื่อ , ข้อความ , callback function 
        'Identity must be a valid email or mobile number',
        (value) => { // value คือส่ิงที่ฝังอยู่ ใช้เรียก valuer ที่ส่งมามาเช็คซักอย่างอันนี้เอาไปเช็ค email / mobile กับ Regex
            // if (!value) { return true } // เอาออกเพราะ ไม่เช็คว่าลบไม่ลบ
            return emailRegex.test(value) || mobileRegex.test(value)
        }
    ),
    password: string().min(4).required(),
    confirmPassword: string().oneOf([ref("password")], "confirmPassword must match Password"),
    email: string().email(),
    // email : string().test("must an email" , value => emailRegex.test(value))
    mobile: string().matches(mobileRegex)
}).transform(value => {
    return ({ ...value, [emailRegex.test(value.identity) ? "email" : "mobile"]: value.identity })
}).noUnknown()




export const validate = (schema, options = {}) => {// option ไม่่ส่งมาได้ ส่งมาเป็น object เปล่า
    return async function (req, res, next) {
        try {
            const cleanBody = await schema.validate(req.body, { abortEarly: false, ...options })
            req.body = cleanBody
            next()
        } catch (error) {
            // console.log(error.errors) // ชุดนี้ คือ error จะออกมาเป็น ก้อนๆ ตามจำนวนที่ error ไม่เห็นค่าข้างในเป้น arr เลย join ข้างล่างไว้ใช้เลย
            // createError(400 , error.errors)

            let errMsg = error.errors.join('|||')
            console.log(errMsg)
            createError(400, errMsg)
        }
    }
}






















//////////////
/// สรุป logic registerSchema นี้ คือรับ idenity มา จะแยกก่อนว่า เป็น email หรือ mobile แล้วก้ เอาเข้าซักคีย์ แล้วลบ idenity ออก เพื่อส่งไป backend
/// front จะส่งมาท่าไหนก้ได้ทั้งแค่ indenity ที่มี email , password หรือ email or password 
//////////////

// test case section 

// let data = {
//     firstName: "andy",
//     lastName: 'asdfsdf',
//     identity: "andy@123.com",
//     mobile: '1234567890',
//     email: "22222@123.com",
//     password: "123456",
//     confirmPassword: "123456",
//     status: "true"
// }

// registerSchema.validate(data, { abortEarly: false }).then(console.log)
//     .catch(err => {
//         console.log('err.errors', err.errors)
//     })

// เทสแยกรัน
// node ./src/validations/validator.js