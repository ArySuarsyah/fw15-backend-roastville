import { Router } from "express"
import * as ProductController from "../controllers/products.controller.js"
import uploadMiddleware from "../middlewares/upload.middleware.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const ProductRouter = Router()

ProductRouter.get("/", ProductController.getAll)
ProductRouter.post(
  "/",
  uploadMiddleware("picture"),
  ProductController.createProduct
)
ProductRouter.patch("/manage/:id", authMiddleware,
  ProductController.updateProduct)

export default ProductRouter
