import multer  from "multer"
import { v2 as cloudinary}  from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

// Configuration 
cloudinary.config({
    cloud_name: "dxs0yxeyr",
    api_key: "236157336681252",
    api_secret: "V2uHsegpJtBpFlUl3WSwkxdCL0I"
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "YogiPrayoga",
        format: async (req, file) => "png", // supports promises as well
        public_id: (req, file) => {
            const filename = new Date().getTime().toString()
            return filename
        },
    },
})

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "upload/")
//     },
//     filename: (req, file, cb) => {
//         const explode = file.originalname.split(".").length
//         const ext = file.originalname.split(".")[explode - 1]
//         const filename = new Date().getTime().toString() + "." + ext
//         cb(null, filename)
//     }
// })

const limits =  {
    fileSize: 1 * 1024 * 1024
}

const fileFilter = (req, file, cb) =>{
    const formatFile = ["image/jpg", "image/jpeg"]
    if(!formatFile.includes(file.mimetype)){
        console.log(file.mimetype)
        cb(Error("fileformat_error"))
    }
    cb(null,true)
}

const upload = multer({storage, limits, fileFilter})

const uploadMiddleware = (field) => {
    const uploadField = upload.single(field)
    return (request, response, next) => {
        uploadField(request, response, (err) => {
            if(err){
                if(err.message === "fileformat_error"){
                    return response.status(400).json({
                        success: false,
                        message: "File format invalid"
                    })
                }
                return response.status(400).json({
                    success: false,
                    message: "File to large"
                })
            }
            return next()
        })
    }
}

export default uploadMiddleware;
