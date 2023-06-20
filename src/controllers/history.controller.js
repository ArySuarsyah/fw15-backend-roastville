import * as historyModel from "../models/history.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAllHistory = async (req, res) => {
  try {
    const { id: userId } = req.user
    const histories = await historyModel.getHistory(userId)
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

export const makeHistory = async (req, res) => {
  try {
    const { id } = req.user
    const data = req.body
    const history = await historyModel.makeHistory(id, data)
    return res.json({
      success: true,
      message: "Make history successfully",
      results: history,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
