import * as transactionModel from "../models/transactions.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAllHistory = async (req, res) => {
  try {
    const { id: userId } = req.user
    const histories = await transactionModel.findAllByUserId(userId, req.query)
    if (!histories) {
      throw Error("history_not_found")
    }
    return res.json({
      success: true,
      message: "Detail histories",
      results: histories,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
