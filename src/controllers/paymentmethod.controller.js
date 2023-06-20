import * as PaymentModel from "../models/paymentmethod.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAllPaymentMethod = async (req, res) => {
  try {
    const data = await PaymentModel.findAll()
    return res.json({
      success: true,
      message: "Get all payments successfully",
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
