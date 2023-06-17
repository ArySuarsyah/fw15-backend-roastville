import * as ProductModel from "../models/product.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAll = async function (req, res) {
  try {
    const product = await ProductModel.findAllProduct()
    return res.json({
      success: true,
      message: "Get all products successfully",
      results: product,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
