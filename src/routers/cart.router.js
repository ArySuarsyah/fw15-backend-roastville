import { Router } from "express"
import * as CartController from "../controllers/cart.controller.js"
import uploadMiddleware from "../middlewares/upload.middleware.js"

const CartRouter = Router()

CartRouter.get("/", CartController.getAllCart)
CartRouter.post("/", CartController.insertCart)

export default CartRouter
