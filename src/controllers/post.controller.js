import cloudinary from "../config/cloudinary.config.js"
import path from "path"
import fs from 'fs/promises'
import prisma from "../config/prisma.config.js"
import createError from "../middlewares/error.middleware.js"

export async function getAllPost(req, res, next) {
    const result = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: { // เอาอะไรที่ใช้บ้าง
                    firstName: true,
                    lastName: true,
                    profileImage: true
                }
            },
            comments: true,
            likes: true
        }
    })

    res.json({ posts: result })
}

export async function createPost(req, res, next) {
    const { message } = req.body
    console.log(req.file) // ส่วนที่ไฟล์ที่อัพโหลดมาถ้า รับหลายไฟล์​ array req.files
    let haveFile = !!req.file //
    let uploadResult = null

    if (haveFile) {// ถ้ามีไฟล์ให้อัพโหลดเลย
        uploadResult = await cloudinary.uploader.upload(req.file.path, {
            overwrite: true,
            public_id: path.parse(req.file.path).name //เอามาแต่ชื่อไฟล์ เพื่อส่งให้ ฝั่ง cloud ชื่อเหมือนกัน
        })
        fs.unlink(req.file.path) //unlink ลบทิ้ง
    }
    // console.log(path.parse(req.file.path))
    // console.log(uploadResult)

    const data = {
        message: message,
        image: uploadResult?.secure_url || '', // uploadResult.secure_url คือพาทที่เปิดได้จาก cloudinary
        userId: req.user.id
    }

    const result = await prisma.post.create({ data })


    res.status(201).json({
        message: 'Created post done',
        result: result
    })

}

export const updatePost = async (req, res, next) => {
 const {id} = req.params
 const {message, removePic} = req.body

 const foundPost = await prisma.post.findUnique({where : { id : +id}})
 if(!foundPost || req.user.id !== foundPost.userId) {
  createError(400, 'Cannot edit this post')
 }
 const haveFile = !!req.file
 let uploadResult
 if(haveFile) {
  uploadResult = await cloudinary.uploader.upload(req.file.path, {
   overwrite: true,
   public_id: path.parse(req.file.path).name
  })
  fs.unlink(req.file.path)
 }
 const data = haveFile
  ? { message, userId: req.user.id, image: uploadResult.secure_url,  }
  : { message, userId: req.user.id, image: removePic ? '' : foundPost.image}
 const rs = await prisma.post.update({
  where : { id : +id},
  data : data
 })

 res.json( {message: 'Update post done'})
}
export async function deletePost(req, res, next) {
    const { id } = req.params

    const foundPost = await prisma.post.findUnique({
        where: { id: Number(id) } ////********ต้องเปลี่ยนเป็น number จ้าาาาาาาา  */
    })

    if (!foundPost) {
        createError(400, 'Post-id not found')
    }

    if (req.user.id !== foundPost.userId) {
        createError(400, 'Cannot delete this post')
    }

    const result = await prisma.post.delete({
        where: { id: Number(id) }
    })

    res.json({ message: 'delete post done' })

}


// export const deletePost = async (req, res, next) => {
// 	const {id} = req.params

// 	const foundPost = await prisma.post.findUnique({
// 		where : { id : +id }
// 	})
// 	if(!foundPost) {
// 		createError(400, 'post-id not found')
// 	}
// 	if(req.user.id !== foundPost.userId) {
// 		createError(400, 'Cannot delete this post')
// 	}
// 	const rs = await prisma.post.delete({where : {id: +id}})

// 	res.json( {message: 'Delete done'})
// }