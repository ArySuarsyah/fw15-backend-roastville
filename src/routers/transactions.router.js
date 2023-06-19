import { Router } from "express"
import * as transactionController from "../controllers/transactions.controller.js"

const transactionRouter = Router()

transactionRouter.get("/", transactionController.getAll)
transactionRouter.post("/", transactionController.makeTransaction)

export default transactionRouter
