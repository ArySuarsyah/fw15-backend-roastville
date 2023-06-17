import { Router } from "express"
import ProfileRouter from "./profile.router.js"

const router = Router()

router.use("/profile", ProfileRouter)

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
