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

export const getVoucherByCode = async function (req, res) {
  const { code } = req.query
  try {
    const voucher = await voucherModel.findOneByCode(code)
    return res.json({
      success: true,
      message: "Get all vouchers successfully",
      results: voucher,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

export const insertVoucher = async (req, res) => {
  try {
    const values = req.body
    const data = await voucherModel.insert(values)
    return res.json({
      success: "true",
      message: "Add voucher successfully",
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
