import { Router } from "express"
import * as CartController from "../controllers/cart.controller.js"

const CartRouter = Router()

CartRouter.get("/:id", CartController.getOneCart)
CartRouter.get("/", CartController.getAllCart)
CartRouter.post("/", CartController.insertCart)

export default CartRouter
