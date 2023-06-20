import { Router } from "express"
import * as deliveryController from "../controllers/delivery.controllers.js"

const deliveryRouter = Router()

deliveryRouter.get("/", deliveryController.getAllDelivery)

export default deliveryRouter
