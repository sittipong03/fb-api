import prisma from "../src/config/prisma.config.js";
import bcrypts from "bcryptjs"

const hashedPassword = bcrypts.hashSync('12345678' , 10)

const userData = [
 { firstName: 'Andy', lastName: 'Codecamp', password: hashedPassword, email: 'andy@ggg.mail',
     profileImage: 'https://www.svgrepo.com/show/420364/avatar-male-man.svg' }, 
 { firstName: 'Bobby', lastName: 'Codecamp', password: hashedPassword, email: 'bobby@ggg.mail',
     profileImage: 'https://www.svgrepo.com/show/420319/actor-chaplin-comedy.svg'},
 { firstName: 'Candy', lastName: 'Codecamp', password: hashedPassword, mobile: '1111111111',
     profileImage: 'https://www.svgrepo.com/show/420327/avatar-child-girl.svg'},
 { firstName: 'Danny', lastName: 'Codecamp', password: hashedPassword, mobile: '2222222222',
     profileImage: 'https://www.svgrepo.com/show/420314/builder-helmet-worker.svg'},
]

const postData = [
    { message : "message 1" , userId: 2},
    { message : "message 2" , userId: 4}
]


async function seedDB(){
    await prisma.user.createMany({data : userData , skipDuplicates:true})
    await prisma.post.createMany({data : postData , skipDuplicates:true})
}

seedDB().then(console.log('DB seed successfull'))
.catch(console.log)
.finally(prisma.$disconnect())