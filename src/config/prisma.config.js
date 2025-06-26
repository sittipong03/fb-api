import {PrismaClient} from "../generated/prisma/index.js"

const prisma = new PrismaClient()

export default prisma

// prisma.user.count().then(rs => console.log(rs))
// prisma.user.count().then(console.log) // เหมืนอข้างบน then ข้างในมี result อันเดียว

// prisma.$queryRaw`select * from user`.then(console.log)