import { Router } from "express"
import * as categoryController from "../controllers/categories.controller.js"

const categoryRouter = Router()

categoryRouter.get("/", categoryController.getAllCategory)
categoryRouter.post("/", categoryController.createCategory)

export default categoryRouter
