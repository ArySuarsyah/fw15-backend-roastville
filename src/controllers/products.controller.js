import * as ProductModel from "../models/products.model.js"
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

export const Insert = async function (req, res) {
  try {
    const product = await ProductModel.Insert(req.body)
    return res.json({
      success: true,
      message: "Add products successfully",
      results: product,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
