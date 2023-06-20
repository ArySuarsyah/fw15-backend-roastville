import * as voucherModel from "../models/vouchers.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAll = async function (req, res) {
  try {
    const voucher = await voucherModel.findAllVoucher()
    return res.json({
      success: true,
      message: "Get all vouchers successfully",
      results: voucher,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
