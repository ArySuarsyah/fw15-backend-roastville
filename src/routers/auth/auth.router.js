import { Router } from "express"
import { Login } from "../../controllers/auth/auth.controller"
import { Register } from "../../controllers/auth/auth.controller"

const authRouter = Router()

authRouter.post("/login", Login)
authRouter.post("/register", Register)

export default authRouter
