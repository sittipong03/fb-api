export function register (req , res ,next){
    res.json({ 
        msg : "register controller",
        body : req.body
    })
}

export const login  = (req ,res , next) => {
        res.json({ 
        msg : "login controller",
        body : req.body
    })

}

export const getMe = (req , res ,next) => {
        res.json({ 
        msg : "get me controller",
        title: title
    })

}

// function reture function 

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