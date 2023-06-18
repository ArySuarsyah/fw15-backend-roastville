import { Router } from "express"
import authRouter from "./auth/auth.router.js"
import ProfileRouter from "./profile.router.js"
import ProductRouter from "../routers/products.router.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = Router()

router.use("/auth", authRouter)
router.use("/profile", authMiddleware, ProfileRouter)
router.use("/products", ProductRouter)

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Backend is running well",
  })
})

router.get("*", (req, res) => {
  return res.status(400).json({
    success: false,
    message: "Resources not found",
  })
})

export default router
