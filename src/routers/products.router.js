import { Router } from "express"
import * as ProductController from "../controllers/products.controller.js"
import uploadMiddleware from "../middlewares/upload.middleware.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const ProductRouter = Router()

ProductRouter.get("/", ProductController.getAll)
ProductRouter.get("/:id",ProductController.findOneProduct)
ProductRouter.post(
  "/",
  uploadMiddleware("picture"),
  ProductController.createProduct
)
ProductRouter.patch("/manage/:id", authMiddleware,uploadMiddleware("picture"),
  ProductController.updateProduct)

export default ProductRouter
