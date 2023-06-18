import { Router } from "express"
import * as ProductController from "../controllers/products.controller.js"

const ProductRouter = Router()

ProductRouter.get("/", ProductController.getAll)
ProductRouter.post("/", ProductController.Insert)

export default ProductRouter
