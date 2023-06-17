import { Router } from "express"
import ProfileController from "../controllers/profile.controller.js"

const ProfileRouter = Router()

ProfileRouter.get("/", ProfileController)

export default ProfileRouter
