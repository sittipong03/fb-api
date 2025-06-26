export default (func) => {
    return function (req, res, next) {
        try {
            const result = func(req, res, next) // func ที่เข้ามาตรงนี้ ถ้าเป็น asyn . await จะเป็น promise อยู่แล้ว ถ้าไม่เป็น จะเข้า if ข้างล่างแล้วออกไปเลย
            if (result && typeof result.then === 'function') { // promise มี result/reject ไม่ว่าทางไหน จะ return เป็น function ออกมา เลยเช็ตตรงนี้ว่า 1. result มีไหม และ func.then เป็นprimomise ( return เป็น function ) หรือไม่
                result.catch(next) // ถ้ามี error จะมี catch
            }
        } catch (error) {
            next(error)

        }
    }
}