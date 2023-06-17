import { Router } from "express"
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from "../../controllers/auth/auth.controller.js"
import { validate } from "../../middlewares/validator.middleware.js"

const authRouter = Router()

authRouter.post("/login", validate("authLogin"), Login)
authRouter.post("/register", validate("authRegister"), Register)
authRouter.post("/forgot-password", validate("authForgot"), ForgotPassword)
authRouter.post("/reset-password", validate("authReset"), ResetPassword)

export default authRouter
