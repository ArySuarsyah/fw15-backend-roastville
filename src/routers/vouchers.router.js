import { Router } from "express"
import * as voucherController from "../controllers/vouchers.controller.js"

const voucherRouter = Router()

voucherRouter.get("/all", voucherController.getAll)
voucherRouter.get("/", voucherController.getVoucherByCode)
voucherRouter.post("/", voucherController.insertVoucher)

export default voucherRouter
