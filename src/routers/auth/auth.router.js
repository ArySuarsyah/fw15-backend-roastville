import { Router } from "express"
import * as AuthController from "../../controllers/auth/auth.controller.js"
import { validate } from "../../middlewares/validator.middleware.js"

const authRouter = Router()

authRouter.post("/login", validate("authLogin"), AuthController.Login)
authRouter.post("/register", validate("authRegister"), AuthController.Register)
authRouter.post(
  "/forgot-password",
  validate("authForgot"),
  AuthController.ForgotPassword
)
authRouter.post(
  "/reset-password",
  validate("authReset"),
  AuthController.ResetPassword
)

export default authRouter
