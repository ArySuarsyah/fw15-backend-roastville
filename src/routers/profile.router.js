import { Router } from "express"
import { getProfile } from "../controllers/profile.controller.js"

const ProfileRouter = Router()

ProfileRouter.get("/", getProfile)

export default ProfileRouter
