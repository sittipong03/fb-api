import createError from "./create-error.util.js"

export default function (identity) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const numberRegex = /^[0-9]{10,15}$/

    let identityKey = ''
    if(emailRegex.test(identity)){
        identityKey = 'email'
    }
    if(numberRegex.test(identity)){
        identityKey = 'mobile'
    } if(!identityKey){
        createError(400 , 'identity only accept Email or Mobile phone' )
    }

    return identityKey
}

// terrery แล้วไป create error ข้างนอก
// return emailRegex.test(identity) ? 'email' : numberRegex.test(identity) ? 'mobile' : null



// วิธีใช้
// /.*ed/.test('xxxxxed')