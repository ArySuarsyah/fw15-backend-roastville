import * as deliveryModel from "../models/delivery.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAllDelivery = async function (req, res) {
  try {
    const delivery = await deliveryModel.findAllDelivery()
    return res.json({
      success: true,
      message: "Get all delivery successfully",
      results: delivery,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
