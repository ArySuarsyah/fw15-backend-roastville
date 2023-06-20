import { Router } from "express"
import * as voucherController from "../controllers/vouchers.controller.js"

const voucherRouter = Router()

voucherRouter.get("/", voucherController.getAll)

export default voucherRouter
