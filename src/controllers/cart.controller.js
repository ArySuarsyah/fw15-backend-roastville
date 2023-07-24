import * as CartModel from "../models/cart.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAllCart = async (req, res) => {
  try {
    const data = await CartModel.getCart()
    return res.json({
      success: "true",
      message: "Get All Cart Successfully",
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

export const insertCart = async (req, res) => {
  const { id } = req.user
  const cartData = req.body
  try {
    const data = await CartModel.insertCart(cartData, id)
    return res.json({
      success: true,
      message: "Add cart successfully",
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
