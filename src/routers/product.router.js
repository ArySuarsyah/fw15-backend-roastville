import { Router } from "express"
import * as ProductController from "../controllers/product.controller.js"

const ProductRouter = Router()

ProductRouter.get("/", ProductController.getAll)

export default ProductRouter
