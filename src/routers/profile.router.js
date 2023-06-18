import { Router } from "express"
import * as ProfileController from "../controllers/profile.controller.js"
import uploadMiddleware from "../middlewares/upload.middleware.js"

const ProfileRouter = Router()

ProfileRouter.get("/user", ProfileController.getProfileByUser)
ProfileRouter.get("/:id", ProfileController.findOneProfile)
ProfileRouter.get(
  "/",
  uploadMiddleware("picture"),
  ProfileController.getProfile
)
ProfileRouter.patch(
  "/",
  uploadMiddleware("picture"),
  ProfileController.updateProfile
)

export default ProfileRouter
