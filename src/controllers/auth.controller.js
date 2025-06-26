import prisma from "../config/prisma.config.js"
import createError from "../utils/create-error.util.js"
import checkIdentity from "../utils/check-identity.util.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getUserBy , createUser } from "../services/user.service.js"

export async function register(req, res, next) {
    try {
        const { identity, firstName, lastName, password, confirmPassword } = req.body

        //validation 
        if (!(identity.trim() && firstName.trim() && lastName.trim() && password.trim() && confirmPassword.trim())) {
            createError(400, 'Please fill all data')
        }
        if (password !== confirmPassword) {
            createError(400, 'please check confirm-password ')
        }
        //identity เป็น email หรือ mobile : checkIdentity (identity) => string ? 'email | mobile '
        const identityKey = checkIdentity(identity)

        // หา user
        const foundUser = await prisma.user.findUnique({
            where: { [identityKey]: identity }
        })

        if (foundUser) {
            createError(409, 'Already have this user')
        }

        const newUser = {
            [identityKey]: identity,
            password: await bcrypt.hash(password, 10),
            firstName: firstName,
            lastName: lastName
        }

        // const result = await prisma.user.create({ data: newUser })

        res.json({
            msg: "Register controller",
            result: result
        })

    } catch (error) {
        next(error)
    }
}


export async function registerYup(req, res, next) {
    // console.log(req.body)
    try {
        const { email , mobile , firstName, lastName, password, confirmPassword } = req.body

        if (email) {
            let foundUserEmail = await getUserBy('email' , email)
            // let foundUserEmail = await prisma.user.findUnique({ where: { email } })
            if (foundUserEmail) createError(409, "Email already exists")
        }
        if (mobile) {
            let foundUserMobile = await getUserBy('mobile' ,mobile)
            // let foundUserMobile = await prisma.user.findUnique({ where: { mobile } })
            if (foundUserMobile) createError(409, "Mobile already exists")
        }
        const newUser = {
            email,
            mobile,
            password : await bcrypt.hash(password, 10),
            firstName,
            lastName
        }

        const result = await createUser(newUser)

        res.json({msg : "Register successful" , result })

    } catch (error) {
        next(error)

    }

}

export const login = async (req, res, next) => {
    const {identity , password ,email ,mobile} = req.body
    const identityKey = email ? 'email' : 'mobile'

    // const foundUser = await prisma.user.findUnique({
    //     where : {[identityKey]: identity}
    // })

    const foundUser = await getUserBy(identityKey , identity)

    if(!foundUser){
        createError(401 , 'Invalid Login')
    }
    let passwordOk = await bcrypt.compare(password , foundUser.password)
    if(!passwordOk){
        createError(401 , 'Invalid Login')
    }
    // create token
    const payload = { id : foundUser.id }
    const token = jwt.sign(payload , process.env.JWT_SECRET , {
        algorithm : "HS256" ,
        expiresIn : "15d"
    })

    res.json({
        msg: "login successful",
        token : token
    })

}

export const getMe = async (req, res, next) => {
    let numUser = await prisma.user.count()
    createError(403, "error")
    res.json({
        msg: "get me controller"
        // numUser : numUser
    })

}
























// function return function 
// export const getMe = (title) => (req , res ,next) => {
//         res.json({ 
//         msg : "get me controller",
//         title: title
//     })

// }
// export function getMe (name){
//     return function (req , res , next ){
//         res.json({
//             name : name
//         })
//     }
// }