import * as CartModel from "../models/cart.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAllCart = async (req, res) => {
  const { id } = req.user
  try {
    const data = await CartModel.getCart(id)
    return res.json({
      success: "true",
      message: "Get All Cart Successfully",
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

export const getOneCart = async (req, res) => {
  const { id } = req.user
  const productId = req.params.id
  try {
    const data = await CartModel.getOneCart(productId, id)
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
  const { productId } = req.body
  const checkCart = await CartModel.getOneCart(productId, id)
  console.log(!checkCart)
  try {
    if (checkCart) {
      await CartModel.destroyCart(productId, id)
    } else if (!checkCart) {
      await CartModel.insertCart(productId, id)
    }
    return res.json({
      success: true,
      message: "Add cart successfully",
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
