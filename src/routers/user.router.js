import { Router } from "express"
import * as UsersController from "../controllers/user.controller.js"
const UserRouter = Router()

UserRouter.get("/", UsersController.getRoleId)
UserRouter.post("/makeadmin", UsersController.makeAdmin)

export default UserRouter
