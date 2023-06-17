import { Router } from "express"
import { getProfile, getProfileByUser, findOneProfile, updateProfile } from "../controllers/profile.controller.js"
import uploadMiddleware from "../middlewares/upload.middleware.js"

const ProfileRouter = Router()

ProfileRouter.get("/user", getProfileByUser)
ProfileRouter.get("/:id", findOneProfile)
ProfileRouter.get("/",uploadMiddleware("picture"), getProfile)
ProfileRouter.patch("/", uploadMiddleware("picture"), updateProfile )


export default ProfileRouter
