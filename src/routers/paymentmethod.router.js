import { Router } from "express"
import * as PaymentController from "../controllers/paymentmethod.controller.js"

const PaymentRouter = Router()

PaymentRouter.get("/", PaymentController.getAllPaymentMethod)

export default PaymentRouter
