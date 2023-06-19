import { Router } from "express"
import * as UsersController from "../controllers/user.controller.js"
const UserRouter = Router()

UserRouter.get("/", UsersController.getRoleId)

export default UserRouter
