import prisma from "../config/prisma.config.js";

export default async function (signal) {
    console.log(`\nReceice ${signal} shutting down` )
    try {
        await prisma.$disconnect() // ปิด prisma เอาชัวร์ๆว่าปิดจริง
        console.log('Prisma disconnect')
    } catch (error) {
        console.log('Error when disconnect' , err )        
    } finally {
        process.exit(0)
    }
}



// process.on("SIGINT" , ()=>{
//     console.log('bbbbbb')
//     process.exit(0)
// })